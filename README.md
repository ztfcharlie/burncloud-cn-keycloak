# Keycloak独立服务器配置

这是一个独立的Keycloak认证服务器配置，专为BurnCloud AI平台设计。可以在项目外部独立部署和运行。

## 🚀 快速启动

### 1. 复制配置到项目外部
```bash
# 将整个keycloak/server目录复制到您希望运行Keycloak的位置
cp -r keycloak/server /path/to/your/keycloak-deployment
cd /path/to/your/keycloak-deployment
```

### 2. 启动服务
```bash
# 启动所有服务（Keycloak + PostgreSQL + Redis）
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f keycloak
```

### 3. 访问管理界面
- **Keycloak管理控制台**: http://localhost:8080/admin
- **管理员账户**: admin / admin
- **用户界面**: http://localhost:8080/realms/burncloud/account

## 👥 预配置用户

### 管理员用户
- **用户名**: admin
- **密码**: admin123
- **邮箱**: admin@burncloud.ai
- **角色**: admin, moderator, user

### 演示用户  
- **用户名**: demo
- **密码**: demo123
- **邮箱**: demo@burncloud.ai
- **角色**: developer, user

## 🔧 配置详情

### 服务组件
- **Keycloak**: 主认证服务器 (端口 8080)
- **PostgreSQL**: 数据持久化 (端口 5433)
- **Redis**: 会话缓存 (端口 6380)

### 预配置内容
- **Realm**: burncloud
- **Client**: burncloud-app
- **用户角色**: user, admin, moderator, developer
- **用户组**: Users, Administrators, Developers

### 回调URL配置
- `http://localhost:3000/auth/keycloak/callback`
- `http://localhost:3000/auth/callback`
- `http://127.0.0.1:3000/auth/keycloak/callback`
- `http://127.0.0.1:3000/auth/callback`

## ⚙️ 环境配置

### 开发环境（默认）
- HTTP模式启用
- 主机名验证禁用
- 详细日志记录
- 自动导入Realm配置

### 生产环境配置
编辑 `.env` 文件并取消注释生产环境设置：
```bash
KC_HOSTNAME=your-keycloak-domain.com
KC_HTTPS_CERTIFICATE_FILE=/opt/keycloak/conf/server.crt.pem
KC_HTTPS_CERTIFICATE_KEY_FILE=/opt/keycloak/conf/server.key.pem
KC_LOG_LEVEL=WARN
```

## 🛠️ 常用命令

### 服务管理
```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看日志
docker-compose logs -f [service_name]

# 进入容器
docker-compose exec keycloak bash
docker-compose exec keycloak-db psql -U keycloak -d keycloak
```

### 数据管理
```bash
# 备份数据库
docker-compose exec keycloak-db pg_dump -U keycloak keycloak > keycloak_backup.sql

# 恢复数据库
docker-compose exec -T keycloak-db psql -U keycloak keycloak < keycloak_backup.sql

# 导出Realm配置
docker-compose exec keycloak /opt/keycloak/bin/kc.sh export --realm burncloud --file /opt/keycloak/data/export/burncloud-export.json
```

## 🔒 安全注意事项

### 生产环境必须修改
1. **管理员密码**: 修改默认的admin/admin
2. **数据库密码**: 更新PostgreSQL密码
3. **客户端密钥**: 更改Keycloak客户端密钥
4. **Redis密码**: 设置强密码
5. **SSL证书**: 启用HTTPS

### 推荐安全配置
```bash
# 生成强密码
openssl rand -base64 32

# 创建SSL证书（自签名）
openssl req -x509 -newkey rsa:4096 -keyout server.key.pem -out server.crt.pem -days 365 -nodes
```

## 🌐 网络配置

### 端口映射
- `8080`: Keycloak HTTP
- `8443`: Keycloak HTTPS
- `5433`: PostgreSQL
- `6380`: Redis

### 防火墙配置
```bash
# 开放必要端口
sudo ufw allow 8080/tcp
sudo ufw allow 8443/tcp

# 限制数据库访问（仅本地）
sudo ufw deny 5433/tcp
sudo ufw deny 6380/tcp
```

## 🔍 故障排除

### 常见问题

#### 1. Keycloak启动失败
```bash
# 检查数据库连接
docker-compose logs keycloak-db
docker-compose logs keycloak

# 重置数据库
docker-compose down -v
docker-compose up -d
```

#### 2. 无法访问管理界面
```bash
# 检查端口占用
netstat -tlnp | grep 8080

# 检查Docker网络
docker network ls
docker-compose exec keycloak curl -I http://localhost:8080
```

#### 3. Realm导入失败
```bash
# 手动导入
docker-compose exec keycloak /opt/keycloak/bin/kc.sh import --file /opt/keycloak/data/import/burncloud-realm.json --override false
```

### 健康检查
```bash
# 检查所有服务状态
curl -f http://localhost:8080/health/ready
curl -f http://localhost:8080/health/live

# 检查数据库
docker-compose exec keycloak-db pg_isready -U keycloak

# 检查Redis
docker-compose exec keycloak-redis redis-cli ping
```

## 📋 集成说明

### BurnCloud AI前端配置
确保您的BurnCloud AI项目 `.env` 文件包含：
```bash
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=burncloud
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=burncloud-app
KEYCLOAK_CLIENT_SECRET=burncloud-client-secret-2024
```

### 测试集成
```bash
# 启动Keycloak
docker-compose up -d

# 在BurnCloud AI项目中测试
npm run dev
# 访问: http://localhost:3000/auth/test-sso
```

## 📞 支持

如果遇到问题：
1. 检查Docker和Docker Compose版本
2. 确认端口未被占用
3. 查看服务日志: `docker-compose logs`
4. 检查网络连接和防火墙设置

---

**注意**: 这是一个为BurnCloud AI平台特别配置的Keycloak实例。在生产环境中部署前，请务必修改所有默认密码和安全设置。