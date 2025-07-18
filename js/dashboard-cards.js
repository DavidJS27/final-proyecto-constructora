class DashboardCards {
    constructor() {
        this.cards = [];
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupCards();
        this.setupAnimations();
        this.setupInteractions();
        this.setupCounterAnimations();
    }

    setupCards() {
        const cards = document.querySelectorAll('.stat-card, .stat-card-alt');
        cards.forEach((card, index) => {
            this.cards.push({
                element: card,
                index: index,
                originalData: this.getCardData(card)
            });
        });
    }

    getCardData(card) {
        const valueElement = card.querySelector('.stat-value, .stat-card-number');
        const changeElement = card.querySelector('.stat-change');
        
        return {
            value: valueElement ? valueElement.textContent : '0',
            change: changeElement ? changeElement.textContent : '',
            lastUpdate: Date.now()
        };
    }

    setupAnimations() {
        
        this.cards.forEach((card, index) => {
            card.element.style.opacity = '0';
            card.element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.element.style.opacity = '1';
                card.element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    setupInteractions() {
        this.cards.forEach(card => {
            const element = card.element;
            
            
            element.addEventListener('mouseenter', () => {
                this.onCardHover(element);
            });

            element.addEventListener('mouseleave', () => {
                this.onCardLeave(element);
            });

            
            element.addEventListener('click', () => {
                this.onCardClick(element);
            });

            
            element.addEventListener('focus', () => {
                this.onCardFocus(element);
            });

            element.addEventListener('blur', () => {
                this.onCardBlur(element);
            });
        });
    }

    setupCounterAnimations() {
        const numberElements = document.querySelectorAll('.stat-value, .stat-card-number');
        
        numberElements.forEach(element => {
            const targetValue = this.extractNumericValue(element.textContent);
            if (targetValue > 0) {
                this.animateNumber(element, 0, targetValue, 2000);
            }
        });
    }

    extractNumericValue(text) {
        const match = text.match(/[\d,]+/);
        return match ? parseInt(match[0].replace(/,/g, '')) : 0;
    }

    animateNumber(element, start, end, duration) {
        const prefix = element.textContent.replace(/[\d,]+/, '');
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = prefix + this.formatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        return num.toLocaleString('es-PY');
    }

    onCardHover(element) {
        
        element.style.transform = 'translateY(-8px) scale(1.02)';
        element.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.2)';
        
        
        const icon = element.querySelector('.stat-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }

    onCardLeave(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        
        const icon = element.querySelector('.stat-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    onCardClick(element) {
        
        element.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);

        
        this.createRippleEffect(element);
    }

    onCardFocus(element) {
        element.style.outline = '2px solid var(--primary-color)';
        element.style.outlineOffset = '2px';
    }

    onCardBlur(element) {
        element.style.outline = 'none';
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-top: -10px;
            margin-left: -10px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    updateCard(cardId, newData) {
        const card = this.cards.find(c => 
            c.element.id === cardId || 
            c.element.querySelector(`#${cardId}`)
        );
        
        if (card) {
            this.animateDataUpdate(card, newData);
        }
    }

    animateDataUpdate(card, newData) {
        const valueElement = card.element.querySelector('.stat-value, .stat-card-number');
        const changeElement = card.element.querySelector('.stat-change');
        
        if (valueElement) {
            
            valueElement.classList.add('updating');
            
            setTimeout(() => {
                const oldValue = this.extractNumericValue(valueElement.textContent);
                const newValue = this.extractNumericValue(newData.value);
                
                if (oldValue !== newValue) {
                    this.animateNumber(valueElement, oldValue, newValue, 1000);
                }
                
                valueElement.classList.remove('updating');
            }, 300);
        }
        
        if (changeElement && newData.change) {
            changeElement.style.opacity = '0';
            changeElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                changeElement.textContent = newData.change;
                changeElement.style.opacity = '1';
                changeElement.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    showLoading(cardId) {
        const card = this.cards.find(c => 
            c.element.id === cardId || 
            c.element.querySelector(`#${cardId}`)
        );
        
        if (card) {
            card.element.classList.add('loading');
        }
    }

    hideLoading(cardId) {
        const card = this.cards.find(c => 
            c.element.id === cardId || 
            c.element.querySelector(`#${cardId}`)
        );
        
        if (card) {
            card.element.classList.remove('loading');
        }
    }

    setCardState(cardId, state) {
        const card = this.cards.find(c => 
            c.element.id === cardId || 
            c.element.querySelector(`#${cardId}`)
        );
        
        if (card) {
            
            card.element.classList.remove('error', 'success-state', 'warning');
            
            
            if (state) {
                card.element.classList.add(state);
            }
        }
    }

    addStatusIndicator(cardId, status = 'success') {
        const card = this.cards.find(c => 
            c.element.id === cardId || 
            c.element.querySelector(`#${cardId}`)
        );
        
        if (card) {
            
            const existingIndicator = card.element.querySelector('.status-indicator');
            if (existingIndicator) {
                existingIndicator.remove();
            }
            
            
            const indicator = document.createElement('div');
            indicator.className = `status-indicator ${status}`;
            card.element.appendChild(indicator);
        }
    }

    refreshAllCards() {
        this.cards.forEach(card => {
            const element = card.element;
            element.style.opacity = '0.8';
            element.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, 200);
        });
    }
}


const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .stat-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .stat-icon {
        transition: all 0.3s ease;
    }
    
    .stat-value.updating {
        animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;


const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);


document.addEventListener('DOMContentLoaded', () => {
    window.dashboardCards = new DashboardCards();
});


if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardCards;
}

