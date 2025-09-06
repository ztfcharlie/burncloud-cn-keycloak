#!/bin/bash

# Keycloak服务器快速设置脚本
# 用于快速配置和启动独立的Keycloak服务

set -e

echo "🔐 BurnCloud AI - Keycloak独立服务器设置"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查Docker环境
echo "🔍 检查Docker环境..."
if ! command -v docker &> /dev/null; then
    print_error "Docker未安装，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

print_status "Docker环境检查完成"

# 检查端口占用
echo "🌐 检查端口占用..."
check_port() {
    local port=$1
    if netstat -tln 2>/dev/null | grep -q ":$port "; then
        print_warning "端口 $port 已被占用"
        return 1
    fi
    return 0
}

PORTS_AVAILABLE=true
if ! check_port 8080; then
    print_error "Keycloak端口 8080 被占用"
    PORTS_AVAILABLE=false
fi

if ! check_port 5433; then
    print_warning "PostgreSQL端口 5433 被占用，但可能不影响运行"
fi

if ! check_port 6380; then
    print_warning "Redis端口 6380 被占用，但可能不影响运行"
fi

if [ "$PORTS_AVAILABLE" = false ]; then
    print_error "关键端口被占用，请检查并释放端口后重试"
    exit 1
fi

print_status "端口检查完成"

# 创建必要的目录和文件
echo "📁 创建必要的目录结构..."
mkdir -p realms themes

# 检查配置文件
if [ ! -f "realms/burncloud-realm.json" ]; then
    print_error "Realm配置文件缺失，请确保 realms/burncloud-realm.json 存在"
    exit 1
fi

print_status "配置文件检查完成"

# 启动服务
echo "🚀 启动Keycloak服务..."
print_info "这可能需要几分钟时间来下载镜像和初始化数据库..."

# 停止可能存在的旧容器
docker-compose down -v 2>/dev/null || true

# 启动服务
if docker-compose up -d; then
    print_status "服务启动成功"
else
    print_error "服务启动失败"
    exit 1
fi

# 等待服务就绪
echo "⏳ 等待服务初始化..."
print_info "正在等待Keycloak启动（这可能需要1-2分钟）..."

# 等待Keycloak健康检查
MAX_ATTEMPTS=60  # 最多等待5分钟
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -sf http://localhost:8080/health/ready > /dev/null 2>&1; then
        print_status "Keycloak服务已就绪"
        break
    fi
    
    if [ $((ATTEMPT % 10)) -eq 0 ]; then
        print_info "等待中... ($((ATTEMPT * 5))秒)"
    fi
    
    sleep 5
    ATTEMPT=$((ATTEMPT + 1))
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    print_error "Keycloak启动超时，请检查日志"
    echo "查看日志: docker-compose logs keycloak"
    exit 1
fi

# 验证服务状态
echo "🔍 验证服务状态..."
docker-compose ps

echo ""
echo "🎉 Keycloak服务启动成功！"
echo "========================="
echo ""
print_status "✅ 服务地址: http://localhost:8080"
print_status "✅ 管理控制台: http://localhost:8080/admin"
print_status "✅ 用户界面: http://localhost:8080/realms/burncloud/account"
echo ""
echo "🔑 管理员账户:"
echo "   用户名: admin"
echo "   密码: admin"
echo ""
echo "👥 测试用户:"
echo "   Demo用户: demo / demo123"
echo "   Admin用户: admin / admin123"
echo ""
echo "🔧 管理命令:"
echo "   查看状态: docker-compose ps"
echo "   查看日志: docker-compose logs -f keycloak"
echo "   停止服务: docker-compose down"
echo "   重启服务: docker-compose restart"
echo ""
print_info "现在您可以在BurnCloud AI项目中测试SSO集成了！"
print_info "访问: http://localhost:3000/auth/test-sso"

# 可选: 自动打开浏览器
if command -v open &> /dev/null; then
    read -p "是否要打开Keycloak管理界面? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open http://localhost:8080/admin
    fi
elif command -v xdg-open &> /dev/null; then
    read -p "是否要打开Keycloak管理界面? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open http://localhost:8080/admin
    fi
fi

echo ""
print_status "🏆 Keycloak独立服务器设置完成！"