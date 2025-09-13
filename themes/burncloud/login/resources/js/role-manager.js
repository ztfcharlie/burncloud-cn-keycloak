/**
 * BurnCloud AI Keycloak Theme - Role Manager Module
 * Handles user role validation and permission checks
 * Version: 1.0.0
 */

(function(window) {
    'use strict';

    // Ensure BurnCloudTheme namespace exists
    window.BurnCloudTheme = window.BurnCloudTheme || {};

    /**
     * Role Manager functionality
     */
    const RoleManager = {
        // Role hierarchy configuration
        roleHierarchy: {
            'super-admin': ['keycloak-admin', 'strapi-admin', 'user'],
            'keycloak-admin': ['user'],
            'strapi-admin': ['user'],
            'content-manager': ['user'],
            'user': []
        },

        // Application role requirements
        appPermissions: {
            'main': ['user'],
            'community': ['user'],
            'strapi-admin': ['strapi-admin', 'super-admin'],
            'user-management': ['keycloak-admin', 'super-admin'],
            'system-settings': ['super-admin']
        },

        // Current user roles
        userRoles: [],

        /**
         * Initialize role manager
         */
        init: function(userRoles = []) {
            this.userRoles = userRoles;
            this.expandRoles();
        },

        /**
         * Expand user roles based on hierarchy
         */
        expandRoles: function() {
            const expandedRoles = [...this.userRoles];

            // Add inherited roles based on hierarchy
            this.userRoles.forEach(role => {
                if (this.roleHierarchy[role]) {
                    this.roleHierarchy[role].forEach(inheritedRole => {
                        if (!expandedRoles.includes(inheritedRole)) {
                            expandedRoles.push(inheritedRole);
                        }
                    });
                }
            });

            this.userRoles = expandedRoles;
        },

        /**
         * Check if user has specific role
         */
        hasRole: function(role) {
            return this.userRoles.includes(role);
        },

        /**
         * Check if user has any of the specified roles
         */
        hasAnyRole: function(roles) {
            if (!Array.isArray(roles)) roles = [roles];
            return roles.some(role => this.hasRole(role));
        },

        /**
         * Check if user has all of the specified roles
         */
        hasAllRoles: function(roles) {
            if (!Array.isArray(roles)) roles = [roles];
            return roles.every(role => this.hasRole(role));
        },

        /**
         * Check if user can access specific application
         */
        canAccessApplication: function(appId) {
            const requiredRoles = this.appPermissions[appId];
            if (!requiredRoles) return true; // No specific requirements

            return this.hasAnyRole(requiredRoles);
        },

        /**
         * Get user's highest role level
         */
        getHighestRole: function() {
            const roleOrder = ['super-admin', 'keycloak-admin', 'strapi-admin', 'content-manager', 'user'];
            
            for (const role of roleOrder) {
                if (this.hasRole(role)) {
                    return role;
                }
            }
            
            return 'guest';
        },

        /**
         * Check if user is admin (has any admin role)
         */
        isAdmin: function() {
            const adminRoles = ['super-admin', 'keycloak-admin', 'strapi-admin'];
            return this.hasAnyRole(adminRoles);
        },

        /**
         * Check if user is super admin
         */
        isSuperAdmin: function() {
            return this.hasRole('super-admin');
        },

        /**
         * Get accessible applications for user
         */
        getAccessibleApplications: function(applications) {
            if (!applications) return [];

            return applications.filter(app => {
                if (app.roles && app.roles.length > 0) {
                    return this.hasAnyRole(app.roles);
                }
                return true; // No role restrictions
            });
        },

        /**
         * Filter applications by category and permissions
         */
        filterApplications: function(applications, category = 'all') {
            let filtered = applications;

            // Filter by user permissions
            filtered = this.getAccessibleApplications(filtered);

            // Filter by category
            switch (category) {
                case 'admin':
                    filtered = filtered.filter(app => 
                        app.roles && app.roles.some(role => 
                            ['super-admin', 'keycloak-admin', 'strapi-admin'].includes(role)
                        )
                    );
                    break;
                case 'public':
                    filtered = filtered.filter(app => 
                        !app.roles || app.roles.includes('user')
                    );
                    break;
                case 'management':
                    filtered = filtered.filter(app => 
                        app.roles && (
                            app.roles.includes('keycloak-admin') || 
                            app.roles.includes('super-admin')
                        )
                    );
                    break;
                case 'content':
                    filtered = filtered.filter(app => 
                        app.roles && (
                            app.roles.includes('strapi-admin') || 
                            app.roles.includes('content-manager') ||
                            app.roles.includes('super-admin')
                        )
                    );
                    break;
            }

            return filtered;
        },

        /**
         * Get role display information
         */
        getRoleDisplayInfo: function(role) {
            const roleInfo = {
                'super-admin': {
                    name: 'Super Administrator',
                    nameCN: '超级管理员',
                    icon: '👑',
                    color: 'danger',
                    level: 5
                },
                'keycloak-admin': {
                    name: 'User Administrator',
                    nameCN: '用户管理员',
                    icon: '👥',
                    color: 'info',
                    level: 4
                },
                'strapi-admin': {
                    name: 'Content Administrator',
                    nameCN: '内容管理员',
                    icon: '📝',
                    color: 'warning',
                    level: 3
                },
                'content-manager': {
                    name: 'Content Manager',
                    nameCN: '内容编辑',
                    icon: '✏️',
                    color: 'secondary',
                    level: 2
                },
                'user': {
                    name: 'User',
                    nameCN: '用户',
                    icon: '👤',
                    color: 'primary',
                    level: 1
                }
            };

            return roleInfo[role] || {
                name: role,
                nameCN: role,
                icon: '❓',
                color: 'muted',
                level: 0
            };
        },

        /**
         * Get user's role badge HTML
         */
        getUserRoleBadge: function(locale = 'en') {
            const highestRole = this.getHighestRole();
            if (highestRole === 'guest') return '';

            const roleInfo = this.getRoleDisplayInfo(highestRole);
            const displayName = locale === 'zh-CN' ? roleInfo.nameCN : roleInfo.name;

            return `
                <span class="role-badge role-${roleInfo.color}" title="${displayName}">
                    <span class="role-icon">${roleInfo.icon}</span>
                    <span class="role-name">${displayName}</span>
                </span>
            `;
        },

        /**
         * Validate role permissions for specific actions
         */
        validatePermission: function(action, resource = null) {
            const permissions = {
                'view-users': ['keycloak-admin', 'super-admin'],
                'manage-users': ['keycloak-admin', 'super-admin'],
                'view-content': ['strapi-admin', 'content-manager', 'super-admin'],
                'manage-content': ['strapi-admin', 'super-admin'],
                'edit-content': ['strapi-admin', 'content-manager', 'super-admin'],
                'view-system': ['super-admin'],
                'manage-system': ['super-admin'],
                'access-admin': ['keycloak-admin', 'strapi-admin', 'super-admin']
            };

            const requiredRoles = permissions[action];
            if (!requiredRoles) return true; // No restrictions defined

            return this.hasAnyRole(requiredRoles);
        },

        /**
         * Log role-based access attempts (for auditing)
         */
        logAccess: function(action, resource = null, granted = false) {
            const logData = {
                timestamp: new Date().toISOString(),
                userRoles: this.userRoles,
                action: action,
                resource: resource,
                granted: granted,
                highestRole: this.getHighestRole()
            };

            // In production, this should send to a proper logging service
            console.log('Role Access Log:', logData);

            // Store in session for debugging (development only)
            if (window.sessionStorage) {
                try {
                    const logs = JSON.parse(sessionStorage.getItem('burncloud_access_logs') || '[]');
                    logs.push(logData);
                    // Keep only last 50 logs
                    if (logs.length > 50) logs.splice(0, logs.length - 50);
                    sessionStorage.setItem('burncloud_access_logs', JSON.stringify(logs));
                } catch (e) {
                    // Ignore storage errors
                }
            }
        },

        /**
         * Get role-based navigation items
         */
        getNavigationItems: function(allItems, locale = 'en') {
            return allItems.filter(item => {
                if (item.requiredRoles && item.requiredRoles.length > 0) {
                    return this.hasAnyRole(item.requiredRoles);
                }
                return true;
            });
        },

        /**
         * Check session validity and role consistency
         */
        validateSession: function() {
            // This would typically validate against the server
            // For now, just check if roles are consistent
            return this.userRoles.length > 0 && this.hasRole('user');
        }
    };

    // Expose RoleManager functionality
    window.BurnCloudTheme.RoleManager = RoleManager;

    // Auto-initialize with user roles from page data
    document.addEventListener('DOMContentLoaded', function() {
        // Try to extract user roles from page configuration
        const configElement = document.getElementById('app-config');
        if (configElement) {
            try {
                const config = JSON.parse(configElement.textContent);
                if (config.userRoles) {
                    RoleManager.init(config.userRoles);
                }
            } catch (e) {
                console.warn('Could not initialize RoleManager from page config:', e);
                RoleManager.init([]);
            }
        }
    });

})(window);