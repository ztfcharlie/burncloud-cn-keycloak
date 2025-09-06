# 🚀 Keycloak独立服务器 - 快速启动指南

## 📋 概述

这是一个为BurnCloud AI平台定制的独立Keycloak认证服务器。您可以将此配置复制到项目外部任何位置运行。

## ⚡ 5分钟快速启动

### 1. 复制到外部目录
```bash
# 复制整个keycloak/server目录到您想要的位置
cp -r keycloak/server /path/to/your/keycloak-server
cd /path/to/your/keycloak-server
```

### 2. 一键启动 (推荐)
```bash
# 运行自动设置脚本
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 3. 手动启动
```bash
# 或者手动启动
docker-compose up -d

# 查看启动进度
docker-compose logs -f keycloak
```

## 🎯 访问服务

### 管理界面
- **URL**: http://localhost:8080/admin
- **用户名**: admin  
- **密码**: admin

### 用户界面
- **URL**: http://localhost:8080/realms/burncloud/account

## 👥 测试用户

### Demo用户
- **用户名**: demo
- **密码**: demo123
- **邮箱**: demo@burncloud.ai
- **角色**: developer, user

### Admin用户
- **用户名**: admin  
- **密码**: admin123
- **邮箱**: admin@burncloud.ai
- **角色**: admin, moderator, user

## 🔧 配置说明

### 预配置内容
- ✅ **Realm**: burncloud (已配置)
- ✅ **Client**: burncloud-app (已配置)
- ✅ **用户**: demo, admin (已创建)
- ✅ **角色**: user, admin, moderator, developer (已设置)
- ✅ **回调URL**: localhost:3000 (已配置)

### 服务端口
- **Keycloak**: 8080 (HTTP), 8443 (HTTPS)
- **PostgreSQL**: 5433 (避免冲突)
- **Redis**: 6380 (避免冲突)

## 🔗 与BurnCloud AI集成

### 1. 确认BurnCloud AI项目配置
确保您的BurnCloud AI项目 `.env` 文件包含:
```bash
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=burncloud
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=burncloud-app
KEYCLOAK_CLIENT_SECRET=burncloud-client-secret-2024
```

### 2. 测试集成
```bash
# 在BurnCloud AI项目目录中
npm run dev

# 访问SSO测试页面
open http://localhost:3000/auth/test-sso
```

## 🛠️ 常用管理命令

```bash
# 查看服务状态
docker-compose ps

# 查看实时日志
docker-compose logs -f keycloak

# 停止服务
docker-compose down

# 重启服务
docker-compose restart keycloak

# 完全清理并重建
docker-compose down -v
docker-compose up -d
```

## ⚠️ 重要提醒

### 开发环境 (当前配置)
- ✅ HTTP模式启用 (方便测试)
- ✅ 详细日志记录
- ✅ 自动导入配置
- ⚠️ 使用默认密码

### 生产环境部署
在生产环境使用前，请：
1. 📖 阅读 `DEPLOYMENT_CHECKLIST.md`
2. 🔒 修改所有默认密码
3. 🌐 配置SSL证书
4. 🛡️ 启用安全设置
5. 📊 设置监控和备份

## 📞 获得帮助

### 文档资源
- **完整说明**: `README.md`
- **部署检查**: `DEPLOYMENT_CHECKLIST.md` 
- **配置文件**: `.env`, `docker-compose.yml`

### 常见问题
1. **端口8080被占用**: 修改 `docker-compose.yml` 中的端口映射
2. **无法访问管理界面**: 检查防火墙和Docker网络
3. **数据库连接失败**: 查看 `docker-compose logs keycloak-db`

---

**🎉 就这么简单！** 

现在您有了一个完全独立的Keycloak认证服务器，可以为BurnCloud AI平台提供企业级SSO认证服务。

需要帮助？检查日志: `docker-compose logs keycloak`