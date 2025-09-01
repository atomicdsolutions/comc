// Chat Widget Functionality
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.isFirstVisit = false;
        this.widget = null;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createWidget();
                this.bindEvents();
                this.checkFirstVisit();
            });
        } else {
            this.createWidget();
            this.bindEvents();
            this.checkFirstVisit();
        }
    }

    createWidget() {
        const chatHTML = `
            <div class="chat-widget" id="chatWidget">
                <div class="chat-popup" id="chatPopup">
                    <div class="chat-header">
                        <h3>How can we help you?</h3>
                        <p>We're here to support your mental health journey</p>
                    </div>
                    <div class="chat-content">
                        <div class="chat-options">
                            <div class="chat-option" data-action="crisis">
                                <i class="fas fa-phone"></i>
                                <h4>Crisis Support</h4>
                                <p>Need immediate help? Text 555-HELP for 24/7 support</p>
                            </div>
                            <div class="chat-option" data-action="resources">
                                <i class="fas fa-book-open"></i>
                                <h4>Find Resources</h4>
                                <p>Locate mental health providers and community support</p>
                            </div>
                            <div class="chat-option" data-action="programs">
                                <i class="fas fa-users"></i>
                                <h4>Join Programs</h4>
                                <p>Explore our community programs and events</p>
                            </div>
                            <div class="chat-option" data-action="volunteer">
                                <i class="fas fa-hands-helping"></i>
                                <h4>Get Involved</h4>
                                <p>Volunteer opportunities and ways to help</p>
                            </div>
                            <div class="chat-option" data-action="contact">
                                <i class="fas fa-envelope"></i>
                                <h4>Contact Us</h4>
                                <p>Send us a message or ask a question</p>
                            </div>
                        </div>
                    </div>
                    <div class="chat-footer">
                        <p>Available Monday-Friday 9AM-6PM | Crisis support 24/7</p>
                    </div>
                </div>
                <button class="chat-button" id="chatButton">
                    <i class="fas fa-comment"></i>
                    <i class="fas fa-times"></i>
                    <div class="chat-badge" id="chatBadge" style="display: none;">1</div>
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
        this.widget = document.getElementById('chatWidget');
    }

    bindEvents() {
        // Use timeout to ensure elements exist
        setTimeout(() => {
            const chatButton = document.getElementById('chatButton');
            const chatPopup = document.getElementById('chatPopup');
            const chatOptions = document.querySelectorAll('.chat-option');

            if (!chatButton) {
                console.error('Chat button not found');
                return;
            }

            // Toggle chat popup
            chatButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat button clicked');
                this.toggleChat();
            });

            // Close chat when clicking outside
            document.addEventListener('click', (e) => {
                const chatWidget = document.getElementById('chatWidget');
                if (chatWidget && !chatWidget.contains(e.target) && this.isOpen) {
                    this.closeChat();
                }
            });

            // Handle chat option clicks
            chatOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const action = option.getAttribute('data-action');
                    console.log('Chat option clicked:', action);
                    this.handleChatAction(action);
                });
            });

            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeChat();
                }
            });
        }, 100);
    }

    checkFirstVisit() {
        // Check if user is on homepage and hasn't seen the chat today
        const isHomepage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
        const lastChatShown = localStorage.getItem('gmcbomc-chat-shown');
        const today = new Date().toDateString();

        if (isHomepage && lastChatShown !== today) {
            this.showWelcomeChat();
            localStorage.setItem('gmcbomc-chat-shown', today);
        }
    }

    showWelcomeChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatBadge = document.getElementById('chatBadge');
        
        // Add welcome animation
        chatWidget.classList.add('welcome');
        chatBadge.style.display = 'flex';
        
        // Show popup after 3 seconds
        setTimeout(() => {
            this.openChat();
            chatBadge.style.display = 'none';
        }, 3000);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const chatButton = document.getElementById('chatButton');
        const chatPopup = document.getElementById('chatPopup');
        const chatWidget = document.getElementById('chatWidget');
        
        this.isOpen = true;
        chatButton.classList.add('active');
        chatPopup.classList.add('active');
        chatWidget.classList.remove('welcome');
    }

    closeChat() {
        const chatButton = document.getElementById('chatButton');
        const chatPopup = document.getElementById('chatPopup');
        
        this.isOpen = false;
        chatButton.classList.remove('active');
        chatPopup.classList.remove('active');
    }

    handleChatAction(action) {
        console.log('Handling chat action:', action);
        
        switch (action) {
            case 'crisis':
                // Show crisis support options
                if (confirm('Need immediate help?\n\n• Text 555-HELP for 24/7 crisis support\n• Or call 988 for Suicide & Crisis Lifeline\n\nClick OK to access our crisis resources page.')) {
                    window.location.href = 'contact.html#crisis';
                }
                break;
            case 'resources':
                window.location.href = 'resources.html';
                break;
            case 'programs':
                window.location.href = 'programs.html';
                break;
            case 'volunteer':
                window.location.href = 'contact.html#volunteer';
                break;
            case 'contact':
                window.location.href = 'contact.html';
                break;
            default:
                console.log('Unknown chat action:', action);
        }
        
        this.closeChat();
    }
}

// Initialize chat widget when DOM is loaded
let chatWidgetInstance = null;

function initializeChatWidget() {
    if (!chatWidgetInstance) {
        chatWidgetInstance = new ChatWidget();
        window.chatWidget = chatWidgetInstance;
    }
}

// Initialize immediately if DOM is already loaded, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatWidget);
} else {
    initializeChatWidget();
}