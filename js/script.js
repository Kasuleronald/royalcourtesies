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
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                });
            }
        }
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
    
    console.log('Chat Elements:', { floatingChat, chatWindow, chatClose, chatForm, chatMessages });
    
    // Open chat window
    if (floatingChat && chatWindow) {
        floatingChat.addEventListener('click', function() {
            console.log('Chat button clicked');
            chatWindow.classList.add('active');
            floatingChat.style.display = 'none';
            resetChat();
        });
    } else {
        console.error('Chat elements not found');
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
        
        chatStarted = false;
        userName = '';
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Hello! 👋 Welcome to Royal Courtesies. What's your name?</p>
                </div>
                <div class="message-time">Just now</div>
            </div>
        `;
        
        // Show name input, hide message input initially
        chatNameInput.style.display = 'block';
        chatMessageInput.style.display = 'none';
        chatNameInput.value = '';
        chatMessageInput.value = '';
        
        // Update placeholder and button text
        chatNameInput.placeholder = 'Your Name';
        const submitBtn = chatForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Start Chat';
    }
    
    // Chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Chat form submitted');
            
            if (!chatStarted) {
                // First message - get name and start chat
                userName = chatNameInput.value.trim();
                if (!userName) {
                    showBotMessage('Please enter your name to start the chat.');
                    return;
                }
                
                // Start the chat
                startChat(userName);
            } else {
                // Subsequent messages
                const message = chatMessageInput.value.trim();
                if (!message) {
                    return;
                }
                
                // Add user message
                addUserMessage(message);
                
                // Clear input
                chatMessageInput.value = '';
                
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
        chatStarted = true;
        userName = name;
        
        // Hide name input, show message input
        chatNameInput.style.display = 'none';
        chatMessageInput.style.display = 'block';
        
        // Update button text
        const submitBtn = chatForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
        
        // Add welcome message with user's name
        addBotMessage(`Nice to meet you, ${name}! 👋 I'm here to help you plan your perfect event. What type of event are you interested in, or how can I assist you today?`);
        
        // Focus on message input
        chatMessageInput.focus();
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
        if (messageCount >= 3) {
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
                            continueChatBtn.parentElement.parentElement.remove();
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
        
        const botMessages = Array.from(document.querySelectorAll('.bot-message .message-content p:not(.typing-indicator p)'))
            .map(p => p.textContent)
            .join('\n');
        
        const conversation = `Chat Conversation with ${userName}:\n\nUser Messages:\n${userMessages}\n\nBot Responses:\n${botMessages}`;
        
        // Show loading state
        const submitBtn = chatForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Using Formspree - REPLACE WITH YOUR FORMSPREE FORM ID
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
        chatForm.insertBefore(successDiv, chatForm.firstChild);
        
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
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Auto-advance testimonials
    if (testimonialSlides.length > 0) {
        let slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Dot click events
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    showSlide(index);
                    // Restart auto-advance
                    slideInterval = setInterval(() => {
                        showSlide(currentSlide + 1);
                    }, 5000);
                });
            });
        }
    }
    
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
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
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
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                }
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
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-item, .value-card, .team-member').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            // Reset dropdown menus
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
                menu.style.maxHeight = '';
            });
            
            // Reset chevron icons
            document.querySelectorAll('.dropdown-toggle .fa-chevron-down').forEach(chevron => {
                chevron.style.transform = '';
            });
        }
    });

    // Video controls for hero section (if using video)
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Ensure video plays correctly on mobile
        heroVideo.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });
    }
});

// Additional utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Enhanced scroll animations with debounce
const debouncedScroll = debounce(() => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .value-card, .team-member');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Initialize animations on load
window.addEventListener('load', function() {
    // Trigger scroll animation once on load
    debouncedScroll();
    
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');
});