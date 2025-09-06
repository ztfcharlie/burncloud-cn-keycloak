# Keycloak生产环境部署检查清单

## 🔒 安全配置检查

### ✅ 密码和密钥
- [ ] 修改Keycloak管理员密码 (默认: admin/admin)
- [ ] 更改PostgreSQL数据库密码
- [ ] 更新客户端密钥 (burncloud-client-secret-2024)
- [ ] 设置Redis认证密码
- [ ] 生成强随机JWT密钥

### ✅ SSL/TLS配置
- [ ] 获取有效的SSL证书
- [ ] 配置HTTPS端口和证书路径
- [ ] 启用严格主机名验证
- [ ] 禁用HTTP模式 (KC_HTTP_ENABLED=false)
- [ ] 配置安全头部

### ✅ 网络安全
- [ ] 配置防火墙规则
- [ ] 限制数据库访问 (仅本地或VPN)
- [ ] 设置反向代理 (Nginx/Apache)
- [ ] 配置rate limiting
- [ ] 启用DDoS保护

## 🌐 生产环境配置

### ✅ 基础设置
- [ ] 设置正确的主机名
- [ ] 配置生产数据库连接
- [ ] 启用数据库连接池
- [ ] 配置缓存策略
- [ ] 设置适当的日志级别

### ✅ 性能优化
- [ ] 调整JVM堆大小
- [ ] 配置数据库连接池参数
- [ ] 启用Redis集群 (如果需要)
- [ ] 配置负载均衡 (如果需要)
- [ ] 优化数据库索引

### ✅ 监控和备份
- [ ] 设置监控和告警
- [ ] 配置日志收集
- [ ] 建立数据库备份策略
- [ ] 设置健康检查端点
- [ ] 配置性能监控

## 📋 生产环境环境变量

```bash
# 主机名和SSL
KC_HOSTNAME=your-keycloak-domain.com
KC_HOSTNAME_STRICT=true
KC_HOSTNAME_STRICT_HTTPS=true
KC_HTTP_ENABLED=false
KC_HTTPS_CERTIFICATE_FILE=/opt/keycloak/conf/server.crt.pem
KC_HTTPS_CERTIFICATE_KEY_FILE=/opt/keycloak/conf/server.key.pem

# 数据库 (生产环境)
KC_DB_URL=jdbc:postgresql://your-db-host:5432/keycloak_prod
KC_DB_USERNAME=keycloak_prod
KC_DB_PASSWORD=your-secure-db-password

# 日志和监控
KC_LOG_LEVEL=WARN
KC_METRICS_ENABLED=true
KC_HEALTH_ENABLED=true

# JVM优化
KC_JAVA_OPTS="-Xms512m -Xmx2048m -XX:MetaspaceSize=96M -XX:MaxMetaspaceSize=256m"

# 缓存配置
KC_CACHE=ispn
KC_CACHE_STACK=tcp
```

## 🚀 部署步骤

### 1. 准备环境
```bash
# 创建生产目录
mkdir -p /opt/keycloak-prod
cd /opt/keycloak-prod

# 复制配置文件
cp -r /path/to/keycloak/server/* .

# 修改配置
nano .env
nano docker-compose.yml
```

### 2. 安全配置
```bash
# 生成SSL证书 (Let's Encrypt推荐)
certbot certonly --standalone -d your-keycloak-domain.com

# 生成强密码
openssl rand -base64 32

# 设置文件权限
chmod 600 .env
chmod 600 realms/*.json
```

### 3. 数据库设置
```bash
# 创建生产数据库
createdb -h your-db-host -U postgres keycloak_prod

# 运行数据库优化脚本
psql -h your-db-host -U postgres -d keycloak_prod -f db-init/init.sql
```

### 4. 启动服务
```bash
# 启动生产服务
docker-compose -f docker-compose.yml up -d

# 验证服务状态
docker-compose ps
curl -f https://your-keycloak-domain.com/health/ready
```

## 🔍 部署后验证

### ✅ 功能测试
- [ ] 管理界面可访问
- [ ] SSL证书有效
- [ ] 用户登录正常
- [ ] 客户端认证工作
- [ ] 令牌刷新功能正常

### ✅ 性能测试
- [ ] 并发用户测试
- [ ] 响应时间测试
- [ ] 内存使用监控
- [ ] 数据库性能监控
- [ ] 网络延迟测试

### ✅ 安全测试
- [ ] 端口扫描测试
- [ ] SSL配置测试
- [ ] 认证漏洞测试
- [ ] 会话安全测试
- [ ] 输入验证测试

## 📞 故障排除

### 常见问题
1. **服务无法启动**
   - 检查端口占用
   - 验证SSL证书路径
   - 检查数据库连接

2. **SSL证书问题**
   - 验证证书有效期
   - 检查证书链完整性
   - 确认域名匹配

3. **数据库连接失败**
   - 检查网络连接
   - 验证用户权限
   - 确认数据库存在

4. **性能问题**
   - 调整JVM参数
   - 优化数据库配置
   - 启用缓存策略

### 紧急联系信息
- 系统管理员: [联系信息]
- 数据库管理员: [联系信息]
- 网络管理员: [联系信息]
- 安全团队: [联系信息]

---

**重要提醒**: 
- 生产部署前请务必完成所有检查项
- 建立完整的备份和恢复计划
- 定期更新和安全补丁
- 保持监控和日志记录
- 建立事故响应计划