/**
 * BurnCloud AI Keycloak Theme - Core JavaScript Module
 * Provides core functionality for theme initialization and management
 * Version: 1.0.0
 */

(function(window) {
    'use strict';

    // Theme namespace
    window.BurnCloudTheme = window.BurnCloudTheme || {};

    /**
     * Core theme functionality
     */
    const Core = {
        // Configuration
        config: {
            animations: true,
            autoRedirectDelay: 5000,
            localStorageKeys: {
                preferredApp: 'burncloud_preferred_app',
                language: 'burncloud_language',
                theme: 'burncloud_theme'
            }
        },

        // DOM ready state
        isReady: false,

        /**
         * Initialize the theme
         */
        init: function() {
            if (this.isReady) return;

            this.setupEventListeners();
            this.initializeTheme();
            this.initializeLanguage();
            this.setupAccessibility();
            this.isReady = true;

            // Dispatch initialization event
            this.dispatch('theme:initialized');
        },

        /**
         * Set up global event listeners
         */
        setupEventListeners: function() {
            // DOM content loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.init.bind(this));
            } else {
                this.init();
            }

            // Form submissions
            this.setupFormHandling();

            // Keyboard navigation
            this.setupKeyboardNavigation();

            // Window resize handling
            window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        },

        /**
         * Initialize theme settings
         */
        initializeTheme: function() {
            const savedTheme = this.getStorageItem('theme');
            if (savedTheme) {
                document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            }

            // Auto-detect system preference if no saved theme
            if (!savedTheme && window.matchMedia) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.classList.toggle('dark', prefersDark);
                
                // Listen for system theme changes
                window.matchMedia('(prefers-color-scheme: dark)')
                    .addEventListener('change', (e) => {
                        if (!this.getStorageItem('theme')) {
                            document.documentElement.classList.toggle('dark', e.matches);
                        }
                    });
            }
        },

        /**
         * Initialize language settings
         */
        initializeLanguage: function() {
            const languageSelector = document.getElementById('language-selector');
            if (languageSelector) {
                const savedLanguage = this.getStorageItem('language');
                if (savedLanguage && languageSelector.value !== savedLanguage) {
                    languageSelector.value = savedLanguage;
                }
            }
        },

        /**
         * Set up form handling
         */
        setupFormHandling: function() {
            // Login form
            const loginForm = document.getElementById('kc-form-login');
            if (loginForm) {
                loginForm.addEventListener('submit', this.handleLoginSubmit.bind(this));
            }

            // Enhanced input focus management
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('focus', this.handleInputFocus.bind(this));
                input.addEventListener('blur', this.handleInputBlur.bind(this));
            });
        },

        /**
         * Handle login form submission
         */
        handleLoginSubmit: function(event) {
            const submitButton = document.getElementById('kc-login');
            if (submitButton) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;

                // Show loading state
                this.showLoadingState();
            }
        },

        /**
         * Handle input focus
         */
        handleInputFocus: function(event) {
            const input = event.target;
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('focused');
            }
        },

        /**
         * Handle input blur
         */
        handleInputBlur: function(event) {
            const input = event.target;
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('focused');
            }
        },

        /**
         * Set up keyboard navigation
         */
        setupKeyboardNavigation: function() {
            // Escape key handling
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.handleEscapeKey(event);
                }
            });

            // Tab navigation enhancements
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            // Mouse click removes keyboard navigation mode
            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        },

        /**
         * Handle escape key press
         */
        handleEscapeKey: function(event) {
            // Close any open modals or overlays
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                this.closeModal(activeModal);
                event.preventDefault();
            }
        },

        /**
         * Set up accessibility features
         */
        setupAccessibility: function() {
            // Add skip links if not present
            this.addSkipLinks();

            // Enhance focus indicators
            this.enhanceFocusIndicators();

            // Set up ARIA live regions
            this.setupAriaLiveRegions();
        },

        /**
         * Add skip navigation links
         */
        addSkipLinks: function() {
            const body = document.body;
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'skip-link';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 1000;
                transition: top 0.2s ease;
            `;

            skipLink.addEventListener('focus', () => {
                skipLink.style.top = '6px';
            });

            skipLink.addEventListener('blur', () => {
                skipLink.style.top = '-40px';
            });

            body.insertBefore(skipLink, body.firstChild);
        },

        /**
         * Enhance focus indicators
         */
        enhanceFocusIndicators: function() {
            const style = document.createElement('style');
            style.textContent = `
                .keyboard-navigation *:focus {
                    outline: 2px solid hsl(var(--primary));
                    outline-offset: 2px;
                }
            `;
            document.head.appendChild(style);
        },

        /**
         * Set up ARIA live regions
         */
        setupAriaLiveRegions: function() {
            // Create announcements region if it doesn't exist
            if (!document.getElementById('announcements')) {
                const announcements = document.createElement('div');
                announcements.id = 'announcements';
                announcements.setAttribute('aria-live', 'polite');
                announcements.setAttribute('aria-atomic', 'true');
                announcements.style.cssText = `
                    position: absolute;
                    left: -10000px;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                `;
                document.body.appendChild(announcements);
            }
        },

        /**
         * Announce message to screen readers
         */
        announce: function(message, priority = 'polite') {
            const announcements = document.getElementById('announcements');
            if (announcements) {
                announcements.setAttribute('aria-live', priority);
                announcements.textContent = message;

                // Clear after announcement
                setTimeout(() => {
                    announcements.textContent = '';
                }, 1000);
            }
        },

        /**
         * Show loading state
         */
        showLoadingState: function() {
            const loader = document.createElement('div');
            loader.className = 'global-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <p>Loading...</p>
                </div>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .global-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .loader-content {
                    background: hsl(var(--card));
                    padding: 2rem;
                    border-radius: var(--radius);
                    text-align: center;
                }
                .loader-spinner {
                    width: 2rem;
                    height: 2rem;
                    border: 3px solid hsl(var(--muted));
                    border-top: 3px solid hsl(var(--primary));
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(loader);
        },

        /**
         * Handle window resize
         */
        handleResize: function() {
            // Update any size-dependent calculations
            this.dispatch('theme:resize');
        },

        /**
         * Storage utilities
         */
        setStorageItem: function(key, value) {
            try {
                localStorage.setItem(this.config.localStorageKeys[key] || key, value);
                return true;
            } catch (e) {
                console.warn('LocalStorage not available:', e);
                return false;
            }
        },

        getStorageItem: function(key) {
            try {
                return localStorage.getItem(this.config.localStorageKeys[key] || key);
            } catch (e) {
                console.warn('LocalStorage not available:', e);
                return null;
            }
        },

        removeStorageItem: function(key) {
            try {
                localStorage.removeItem(this.config.localStorageKeys[key] || key);
                return true;
            } catch (e) {
                console.warn('LocalStorage not available:', e);
                return false;
            }
        },

        /**
         * Event dispatching
         */
        dispatch: function(eventName, data = null) {
            const event = new CustomEvent(eventName, {
                detail: data,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        },

        /**
         * Debounce utility
         */
        debounce: function(func, wait, immediate = false) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func.apply(this, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, args);
            };
        },

        /**
         * Throttle utility
         */
        throttle: function(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // Expose Core functionality
    BurnCloudTheme.Core = Core;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Core.init.bind(Core));
    } else {
        Core.init();
    }

})(window);