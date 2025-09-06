-- Keycloak数据库初始化脚本
-- 这个脚本会在PostgreSQL容器首次启动时执行

-- 创建额外的数据库用户和权限（如果需要）
-- CREATE USER keycloak_readonly WITH PASSWORD 'readonly_password';
-- GRANT CONNECT ON DATABASE keycloak TO keycloak_readonly;
-- GRANT USAGE ON SCHEMA public TO keycloak_readonly;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO keycloak_readonly;

-- 设置数据库参数优化
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;

-- 重新加载配置
SELECT pg_reload_conf();

-- 创建扩展（如果需要）
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- 输出初始化完成信息
DO $$
BEGIN
    RAISE NOTICE 'Keycloak数据库初始化完成';
    RAISE NOTICE '数据库名称: keycloak';
    RAISE NOTICE '用户: keycloak';
    RAISE NOTICE '连接字符串: jdbc:postgresql://keycloak-db:5432/keycloak';
END $$;