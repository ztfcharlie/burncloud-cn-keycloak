/**
 * BurnCloud AI Keycloak Theme - Application Selector Module
 * Handles multi-application selection with role-based access control
 * Version: 1.0.0
 */

(function(window) {
    'use strict';

    // Ensure BurnCloudTheme namespace exists
    window.BurnCloudTheme = window.BurnCloudTheme || {};

    /**
     * Application Selector functionality
     */
    const ApplicationSelector = {
        // Configuration
        config: null,
        userRoles: [],
        locale: 'zh-CN',
        messages: {},
        
        // State
        autoRedirectTimer: null,
        preferredApp: null,
        
        // DOM elements
        elements: {
            publicGrid: null,
            adminGrid: null,
            adminSection: null,
            redirectNotice: null,
            rememberCheckbox: null
        },

        /**
         * Initialize application selector
         */
        init: function() {
            this.loadConfiguration();
            this.cacheElements();
            this.loadUserPreferences();
            this.renderApplications();
            this.setupEventListeners();
            this.checkAutoRedirect();
        },

        /**
         * Load configuration from embedded JSON
         */
        loadConfiguration: function() {
            const configElement = document.getElementById('app-config');
            if (configElement) {
                try {
                    this.config = JSON.parse(configElement.textContent);
                    this.userRoles = this.config.userRoles || [];
                    this.locale = this.config.locale || 'zh-CN';
                    this.messages = this.config.messages || {};
                } catch (e) {
                    console.error('Failed to parse application configuration:', e);
                    this.config = { applications: { public: [], admin: [] } };
                }
            }
        },

        /**
         * Cache DOM elements
         */
        cacheElements: function() {
            this.elements.publicGrid = document.getElementById('public-app-grid');
            this.elements.adminGrid = document.getElementById('admin-app-grid');
            this.elements.adminSection = document.getElementById('admin-apps');
            this.elements.redirectNotice = document.getElementById('auto-redirect-notice');
            this.elements.rememberCheckbox = document.getElementById('remember-choice');
        },

        /**
         * Load user preferences from storage
         */
        loadUserPreferences: function() {
            if (window.BurnCloudTheme && window.BurnCloudTheme.Core) {
                this.preferredApp = window.BurnCloudTheme.Core.getStorageItem('preferredApp');
                
                // Set remember checkbox state
                if (this.elements.rememberCheckbox) {
                    this.elements.rememberCheckbox.checked = !!this.preferredApp;
                }
            }
        },

        /**
         * Render all applications
         */
        renderApplications: function() {
            if (!this.config) return;

            // Render public applications
            this.renderPublicApplications();
            
            // Render admin applications (if user has admin roles)
            this.renderAdminApplications();
        },

        /**
         * Render public applications
         */
        renderPublicApplications: function() {
            if (!this.elements.publicGrid || !this.config.applications.public) return;

            const publicApps = this.config.applications.public.filter(app => 
                this.hasRequiredRoles(app.roles)
            );

            this.elements.publicGrid.innerHTML = '';
            
            publicApps.forEach(app => {
                const appCard = this.createApplicationCard(app, false);
                this.elements.publicGrid.appendChild(appCard);
            });

            // Show message if no public apps available
            if (publicApps.length === 0) {
                this.showNoAppsMessage(this.elements.publicGrid);
            }
        },

        /**
         * Render admin applications
         */
        renderAdminApplications: function() {
            if (!this.elements.adminGrid || !this.config.applications.admin) return;

            const adminApps = this.config.applications.admin.filter(app => 
                this.hasRequiredRoles(app.roles)
            );

            this.elements.adminGrid.innerHTML = '';

            if (adminApps.length > 0) {
                // Show admin section
                if (this.elements.adminSection) {
                    this.elements.adminSection.style.display = 'block';
                }

                adminApps.forEach(app => {
                    const appCard = this.createApplicationCard(app, true);
                    this.elements.adminGrid.appendChild(appCard);
                });
            } else {
                // Hide admin section if no admin apps
                if (this.elements.adminSection) {
                    this.elements.adminSection.style.display = 'none';
                }
            }
        },

        /**
         * Create application card element
         */
        createApplicationCard: function(app, isAdmin = false) {
            const card = document.createElement('div');
            card.className = `app-card ${app.color || 'primary'}${isAdmin ? ' admin' : ''}`;
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `${this.getLocalizedText(app.name)} - ${this.getLocalizedText(app.description)}`);
            
            card.innerHTML = `
                <div class="app-header">
                    <div class="app-icon">${app.icon}</div>
                    <h3 class="app-title">${this.getLocalizedText(app.name)}</h3>
                </div>
                <p class="app-description">${this.getLocalizedText(app.description)}</p>
                <div class="app-meta">
                    <span class="app-status">${isAdmin ? '🛡️ Admin' : 'Public'}</span>
                    <span class="app-arrow">→</span>
                </div>
            `;

            // Add event listeners
            card.addEventListener('click', () => this.selectApplication(app));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectApplication(app);
                }
            });

            return card;
        },

        /**
         * Get localized text
         */
        getLocalizedText: function(textObj) {
            if (typeof textObj === 'string') return textObj;
            if (typeof textObj === 'object') {
                return textObj[this.locale] || textObj['en'] || textObj['zh-CN'] || '';
            }
            return '';
        },

        /**
         * Check if user has required roles
         */
        hasRequiredRoles: function(requiredRoles) {
            if (!requiredRoles || requiredRoles.length === 0) return true;
            
            return requiredRoles.some(role => 
                this.userRoles.includes(role) || 
                this.userRoles.includes('super-admin')
            );
        },

        /**
         * Show no apps message
         */
        showNoAppsMessage: function(container) {
            const message = document.createElement('div');
            message.className = 'no-apps-message';
            message.innerHTML = `
                <div class="no-apps-icon">📱</div>
                <div class="no-apps-text">${this.messages.noPermission || 'No applications available'}</div>
                <div class="no-apps-subtext">Contact your administrator for access</div>
            `;
            container.appendChild(message);
        },

        /**
         * Set up event listeners
         */
        setupEventListeners: function() {
            // Remember choice checkbox
            if (this.elements.rememberCheckbox) {
                this.elements.rememberCheckbox.addEventListener('change', 
                    this.toggleRememberChoice.bind(this)
                );
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.cancelAutoRedirect();
                }
            });
        },

        /**
         * Handle application selection
         */
        selectApplication: function(app) {
            // Add loading state
            this.showApplicationLoading(app);
            
            // Save preference if remember is checked
            if (this.elements.rememberCheckbox && this.elements.rememberCheckbox.checked) {
                this.savePreferredApplication(app.id);
            }

            // Announce selection to screen readers
            if (window.BurnCloudTheme && window.BurnCloudTheme.Core) {
                window.BurnCloudTheme.Core.announce(
                    `Redirecting to ${this.getLocalizedText(app.name)}`
                );
            }

            // Redirect after short delay for UX
            setTimeout(() => {
                window.location.href = app.url;
            }, 500);
        },

        /**
         * Show loading state for selected app
         */
        showApplicationLoading: function(app) {
            const cards = document.querySelectorAll('.app-card');
            cards.forEach(card => {
                if (card.querySelector('.app-title').textContent === this.getLocalizedText(app.name)) {
                    card.classList.add('loading');
                } else {
                    card.style.opacity = '0.5';
                    card.style.pointerEvents = 'none';
                }
            });
        },

        /**
         * Check for auto redirect
         */
        checkAutoRedirect: function() {
            if (this.preferredApp && this.elements.rememberCheckbox && this.elements.rememberCheckbox.checked) {
                const app = this.findApplicationById(this.preferredApp);
                if (app && this.hasRequiredRoles(app.roles)) {
                    this.startAutoRedirect(app);
                }
            }
        },

        /**
         * Start auto redirect countdown
         */
        startAutoRedirect: function(app) {
            if (!this.elements.redirectNotice) return;

            let countdown = 5;
            
            // Show redirect notice
            this.elements.redirectNotice.style.display = 'block';
            
            // Update app name in notice
            const appNameElement = document.getElementById('redirect-app-name');
            if (appNameElement) {
                appNameElement.textContent = this.getLocalizedText(app.name);
            }

            // Update countdown
            const updateCountdown = () => {
                const countdownElement = document.getElementById('redirect-countdown');
                if (countdownElement) {
                    countdownElement.textContent = countdown;
                }
            };

            updateCountdown();

            // Start countdown
            this.autoRedirectTimer = setInterval(() => {
                countdown--;
                updateCountdown();

                if (countdown <= 0) {
                    this.selectApplication(app);
                }
            }, 1000);
        },

        /**
         * Cancel auto redirect
         */
        cancelAutoRedirect: function() {
            if (this.autoRedirectTimer) {
                clearInterval(this.autoRedirectTimer);
                this.autoRedirectTimer = null;
            }

            if (this.elements.redirectNotice) {
                this.elements.redirectNotice.style.display = 'none';
            }
        },

        /**
         * Toggle remember choice
         */
        toggleRememberChoice: function() {
            if (this.elements.rememberCheckbox.checked) {
                // Remember is now enabled - will save on next selection
                return;
            } else {
                // Remember is disabled - clear saved preference
                this.clearPreferredApplication();
                this.cancelAutoRedirect();
            }
        },

        /**
         * Save preferred application
         */
        savePreferredApplication: function(appId) {
            if (window.BurnCloudTheme && window.BurnCloudTheme.Core) {
                window.BurnCloudTheme.Core.setStorageItem('preferredApp', appId);
                this.preferredApp = appId;
            }
        },

        /**
         * Clear preferred application
         */
        clearPreferredApplication: function() {
            if (window.BurnCloudTheme && window.BurnCloudTheme.Core) {
                window.BurnCloudTheme.Core.removeStorageItem('preferredApp');
                this.preferredApp = null;
            }
        },

        /**
         * Find application by ID
         */
        findApplicationById: function(appId) {
            if (!this.config) return null;

            // Search in public apps
            let app = this.config.applications.public.find(a => a.id === appId);
            if (app) return app;

            // Search in admin apps
            app = this.config.applications.admin.find(a => a.id === appId);
            return app || null;
        }
    };

    // Expose ApplicationSelector functionality
    window.BurnCloudTheme.ApplicationSelector = ApplicationSelector;

    // Auto-initialize when DOM is ready and on application selector pages
    document.addEventListener('DOMContentLoaded', function() {
        // Check if this is the application selector page
        if (document.getElementById('app-config')) {
            ApplicationSelector.init();
        }
    });

    // Export cancel function globally for template use
    window.cancelAutoRedirect = ApplicationSelector.cancelAutoRedirect.bind(ApplicationSelector);
    window.toggleRememberChoice = ApplicationSelector.toggleRememberChoice.bind(ApplicationSelector);

})(window);