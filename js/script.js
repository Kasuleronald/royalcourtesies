// Main JavaScript for Royal Courtesies Ltd Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Royal Courtesies Website Loaded');

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Mobile Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('active');
                    
                    // Rotate chevron icon
                    const chevron = this.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = dropdownMenu.classList.contains('active') 
                            ? 'rotate(180deg)' 
                            : 'rotate(0deg)';
                    }
                }
            }
        });
    });
    
    // Close mobile menu when clicking on a link (except dropdown toggles)
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Close all dropdown menus
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
                
                // Reset chevron icons
                document.querySelectorAll('.dropdown-toggle .fa-chevron-down').forEach(chevron => {
                    chevron.style.transform = 'rotate(0deg)';
                });
            }
        });
    });
    
    // Chat Functionality
    const floatingChat = document.getElementById('floatingChat');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const chatNameInput = document.getElementById('chatName');
    const chatMessageInput = document.getElementById('chatMessage');
    
    let userName = '';
    let chatStarted = false;
    
    console.log('Chat Elements:', { 
        floatingChat, 
        chatWindow, 
        chatClose, 
        chatForm, 
        chatMessages,
        chatNameInput,
        chatMessageInput
    });
    
    // Open chat window
    if (floatingChat && chatWindow) {
        floatingChat.addEventListener('click', function() {
            console.log('Chat button clicked');
            chatWindow.classList.add('active');
            floatingChat.style.display = 'none';
            resetChat();
        });
    }
    
    // Close chat window
    if (chatClose && chatWindow && floatingChat) {
        chatClose.addEventListener('click', function() {
            chatWindow.classList.remove('active');
            setTimeout(() => {
                floatingChat.style.display = 'flex';
            }, 300);
        });
    }
    
    // Reset chat to initial state
    function resetChat() {
        if (!chatMessages || !chatForm) return;
        
        console.log('Resetting chat...');
        chatStarted = false;
        userName = '';
        
        // Clear all messages and set initial message
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Hello! 👋 Welcome to Royal Courtesies. What's your name?</p>
                </div>
                <div class="message-time">Just now</div>
            </div>
        `;
        
        // Show name input, hide message input initially
        if (chatNameInput) chatNameInput.style.display = 'block';
        if (chatMessageInput) chatMessageInput.style.display = 'none';
        if (chatNameInput) chatNameInput.value = '';
        if (chatMessageInput) chatMessageInput.value = '';
        
        // Update placeholder and button text
        if (chatNameInput) chatNameInput.placeholder = 'Your Name';
        const submitBtn = chatForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Start Chat';
            submitBtn.disabled = false;
        }
        
        console.log('Chat reset complete');
    }
    
    // Chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Chat form submitted, chatStarted:', chatStarted);
            
            if (!chatStarted) {
                // First message - get name and start chat
                userName = chatNameInput ? chatNameInput.value.trim() : '';
                console.log('User name entered:', userName);
                
                if (!userName) {
                    showBotMessage('Please enter your name to start the chat.');
                    return;
                }
                
                // Start the chat
                startChat(userName);
            } else {
                // Subsequent messages
                const message = chatMessageInput ? chatMessageInput.value.trim() : '';
                console.log('User message:', message);
                
                if (!message) {
                    showBotMessage('Please enter a message.');
                    return;
                }
                
                // Add user message
                addUserMessage(message);
                
                // Clear input
                if (chatMessageInput) chatMessageInput.value = '';
                
                // Show typing indicator and bot response
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    handleBotResponse(message);
                }, 1500);
            }
        });
    }
    
    // Start the chat after name is entered
    function startChat(name) {
        console.log('Starting chat with:', name);
        chatStarted = true;
        userName = name;
        
        // Hide name input, show message input
        if (chatNameInput) chatNameInput.style.display = 'none';
        if (chatMessageInput) chatMessageInput.style.display = 'block';
        
        // Update button text
        const submitBtn = chatForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
        }
        
        // Add welcome message with user's name
        addBotMessage(`Nice to meet you, ${name}! 👋 I'm here to help you plan your perfect event. What type of event are you interested in, or how can I assist you today?`);
        
        // Focus on message input
        if (chatMessageInput) chatMessageInput.focus();
        
        console.log('Chat started successfully');
    }
    
    // Add user message to chat
    function addUserMessage(message) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">Just now</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add bot message to chat
    function addBotMessage(message) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">Just now</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Handle bot responses
    function handleBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Simple response logic based on keywords
        if (lowerMessage.includes('wedding') || lowerMessage.includes('marriage')) {
            addBotMessage(`Beautiful! 🎉 Weddings are so special. We've created magical weddings at venues like Kampala Serena Hotel and Speke Resort. Would you like to know more about our wedding packages or have a specific date in mind?`);
        } 
        else if (lowerMessage.includes('corporate') || lowerMessage.includes('business') || lowerMessage.includes('conference')) {
            addBotMessage(`Excellent choice for corporate events! 🏢 We specialize in professional conferences, product launches, and corporate galas. We can handle everything from protocol services to venue setup. What's the approximate number of guests?`);
        }
        else if (lowerMessage.includes('birthday') || lowerMessage.includes('anniversary')) {
            addBotMessage(`Celebrations are our specialty! 🎂 Whether it's a birthday, anniversary, or any special milestone, we create unforgettable experiences. Are you thinking of an intimate gathering or a larger celebration?`);
        }
        else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
            addBotMessage(`We offer customized packages to fit various budgets! 💰 Our pricing depends on the event type, guest count, and services needed. Would you like me to connect you with our events team for a detailed quote?`);
        }
        else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
            addBotMessage(`I'd be happy to connect you with our team! 📞 You can reach us at:\n• Phone: +256 782 722 222\n• Email: info@royalcourtesies.co.ug\n• Or we can schedule a consultation call. Would you prefer a specific time?`);
        }
        else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            addBotMessage(`You're very welcome, ${userName}! 😊 Is there anything else I can help you with regarding your event planning?`);
        }
        else {
            addBotMessage(`Thank you for sharing that, ${userName}! ✨ To better assist you, could you tell me:\n• What type of event you're planning?\n• Approximate guest count?\n• Preferred date or season?\nOr would you prefer to speak directly with our events specialist?`);
        }
        
        // After a few messages, suggest sending email for detailed discussion
        const messageCount = document.querySelectorAll('.user-message').length;
        if (messageCount >= 2) {
            setTimeout(() => {
                addBotMessage(`To provide you with the most accurate information and pricing, I recommend connecting with our events team. Would you like me to send your conversation to our team so they can reach out to you personally?`);
                
                // Add send email button
                const emailButtonDiv = document.createElement('div');
                emailButtonDiv.className = 'message bot-message';
                emailButtonDiv.innerHTML = `
                    <div class="message-content">
                        <p>Shall I send this conversation to our team?</p>
                        <div class="chat-actions">
                            <button class="btn btn-primary btn-small" id="sendEmailBtn">Yes, send to team</button>
                            <button class="btn btn-outline btn-small" id="continueChatBtn">Continue chatting</button>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(emailButtonDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Add event listeners to buttons
                setTimeout(() => {
                    const sendEmailBtn = document.getElementById('sendEmailBtn');
                    const continueChatBtn = document.getElementById('continueChatBtn');
                    
                    if (sendEmailBtn) {
                        sendEmailBtn.addEventListener('click', function() {
                            sendChatToEmail();
                        });
                    }
                    
                    if (continueChatBtn) {
                        continueChatBtn.addEventListener('click', function() {
                            emailButtonDiv.remove();
                            addBotMessage(`Great! Let's continue our conversation. What else would you like to know about our services?`);
                        });
                    }
                }, 100);
            }, 1000);
        }
    }
    
    // Send chat conversation to email
    function sendChatToEmail() {
        const userMessages = Array.from(document.querySelectorAll('.user-message .message-content p'))
            .map(p => p.textContent)
            .join('\n');
        
        const conversation = `Chat Conversation with ${userName}:\n\nUser Messages:\n${userMessages}`;
        
        // Show loading state
        const submitBtn = chatForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Using Formspree
        const formspreeURL = 'https://formspree.io/f/xvojnqyz'; // Replace with your Formspree form ID
        
        fetch(formspreeURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                conversation: conversation,
                _subject: `Chat Conversation with ${userName}`,
                _replyto: 'info@royalcourtesies.co.ug'
            })
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage();
                // Reset chat after success
                setTimeout(() => {
                    resetChat();
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addBotMessage('Sorry, there was an error sending your conversation. Please contact us directly at info@royalcourtesies.co.ug');
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
    
    // Function to show success message
    function showSuccessMessage() {
        addBotMessage('Perfect! ✅ I\'ve sent our conversation to our events team. They\'ll contact you within 24 hours to discuss your event in detail. Thank you for choosing Royal Courtesies!');
        
        // Add success message to form area
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Conversation sent to our team!';
        if (chatForm) {
            chatForm.insertBefore(successDiv, chatForm.firstChild);
        }
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 5000);
    }
    
    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (chatWindow && chatWindow.classList.contains('active')) {
            if (!chatWindow.contains(e.target) && !floatingChat.contains(e.target)) {
                chatWindow.classList.remove('active');
                setTimeout(() => {
                    if (floatingChat) floatingChat.style.display = 'flex';
                }, 300);
            }
        }
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't prevent default for dropdown toggles on mobile
            if (this.classList.contains('dropdown-toggle') && window.innerWidth <= 768) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.style.backgroundColor = 'rgba(10, 23, 40, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'var(--primary-blue)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
});

// Initialize on load
window.addEventListener('load', function() {
    console.log('Website fully loaded');
});