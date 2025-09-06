# BurnCloud CN Keycloak Server

这是一个为 BurnCloud CN 平台设计的独立 Keycloak 认证服务器配置，可以在项目外部独立部署和运行。

## 🚀 快速启动

### 1. 初始化环境
```bash
# 初始化环境目录
./run.sh init

# 生成自签名证书
./run.sh certs
```

### 2. 启动服务
```bash
# 启动所有服务（Keycloak + PostgreSQL + Redis）
./run.sh start

# 查看服务状态
./run.sh status

# 查看日志
./run.sh logs [service_name]
```

### 3. 停止服务
```bash
# 停止所有服务
./run.sh stop
```

## 👥 账户信息

### 管理员账户
- **用户名**: admin
- **密码**: burncloud2024 (来自 .env 文件的 KEYCLOAK_ADMIN_PASSWORD)
- **访问地址**: https://testauth.burncloud.cn/admin

### 预配置用户
#### 管理员用户
- **用户名**: admin
- **密码**: admin123
- **邮箱**: admin@burncloud.ai
- **角色**: admin, user

#### 演示用户  
- **用户名**: demo
- **密码**: demo123
- **邮箱**: demo@burncloud.ai
- **角色**: developer, user

## 🔧 配置详情

### 服务组件
- **Keycloak**: 主认证服务器 (端口 8080/8443)
- **PostgreSQL**: 数据持久化 (端口 5432)
- **Redis**: 会话缓存 (端口 6379)

### 网络配置
- **Keycloak**: 172.22.0.10
- **PostgreSQL**: 172.22.0.0/16 网络
- **Redis**: 172.22.0.0/16 网络

### 预配置内容
- **Realm**: burncloud
- **Client**: burncloud-app / burncloud-ai
- **用户角色**: user, admin, moderator, developer
- **用户组**: Users, Administrators, Developers

## 🌐 访问方式

### 管理界面
- **地址**: https://testauth.burncloud.cn/admin
- **账户**: admin / burncloud2024

### 用户账户界面
- **地址**: https://testauth.burncloud.cn/realms/burncloud/account

### 开放端口
- `8080`: Keycloak HTTP (内部)
- `8443`: Keycloak HTTPS (内部)
- `5432`: PostgreSQL (内部)
- `6379`: Redis (内部)

注意：这些服务在内部网络中运行，外部访问通过 nginx 或其他反向代理进行。

## ⚙️ 环境配置

### 环境变量 (.env 文件)
```bash
# Keycloak Hostname
KC_HOSTNAME=testauth.burncloud.cn

# Keycloak Database Configuration
KC_DB_USERNAME=keycloak
KC_DB_URL=jdbc:postgresql://burncloud-cn-keycloak-postgres:5432/keycloak_db

# Keycloak Database Password
KEYCLOAK_DB_PASSWORD=kc_db_7F4jR8nX2m5qL9wE

# Keycloak Admin Password
KEYCLOAK_ADMIN_PASSWORD=burncloud2024

# Redis Password
REDIS_PASSWORD=kc_redis_2P6jQ9mR5x7vL4nK

# Keycloak HTTPS Certificate Files
KC_HTTPS_CERTIFICATE_FILE=/opt/keycloak/conf/server.crt.pem
KC_HTTPS_CERTIFICATE_KEY_FILE=/opt/keycloak/conf/server.key.pem
```

## 🛠️ 常用命令

### 服务管理
```bash
# 初始化环境
./run.sh init

# 生成证书
./run.sh certs

# 导入领域配置
./run.sh import

# 启动服务
./run.sh start

# 停止服务
./run.sh stop

# 重启服务
./run.sh restart

# 查看状态
./run.sh status
```

### 数据管理
```bash
# 备份数据库
docker-compose exec burncloud-cn-keycloak-postgres pg_dump -U keycloak keycloak_db > backup.sql

# 恢复数据库
docker-compose exec -T burncloud-cn-keycloak-postgres psql -U keycloak keycloak_db < backup.sql
```

## 🔒 安全注意事项

### 生产环境必须修改
1. **管理员密码**: 修改默认的 KEYCLOAK_ADMIN_PASSWORD
2. **数据库密码**: 更新 KEYCLOAK_DB_PASSWORD
3. **Redis密码**: 更新 REDIS_PASSWORD
4. **SSL证书**: 使用有效的 SSL 证书替换自签名证书

### 证书管理
```bash
# 重新生成证书
./run.sh certs
```

## 🔍 故障排除

### 常见问题

#### 1. Keycloak启动失败
```bash
# 检查日志
docker-compose logs burncloud-cn-keycloak

# 重置环境
./run.sh stop
./run.sh init
./run.sh start
```

#### 2. 无法访问管理界面
```bash
# 检查服务状态
./run.sh status

# 检查网络连接
docker-compose exec burncloud-cn-keycloak curl -I http://localhost:8080
```

## 📞 支持

如果遇到问题：
1. 检查Docker和Docker Compose版本
2. 确认端口未被占用
3. 查看服务日志: `docker-compose logs`
4. 检查网络连接和防火墙设置

---
**注意**: 这是一个为BurnCloud CN平台特别配置的Keycloak实例。在生产环境中部署前，请务必修改所有默认密码和安全设置。