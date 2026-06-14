// Last Agent Bids Website JavaScript - Enhanced with Liquid Glass Effects
document.addEventListener('DOMContentLoaded', function() {
    // Wallet Connection Logic
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletStatus = document.getElementById('walletStatus');
    const connectWallet = document.getElementById('connectWallet');
    const createGameBtn = document.getElementById('createGameBtn');
    const luckRollSection = document.getElementById('luckRollSection');
    const rollLuckBtn = document.getElementById('rollLuck');
    const luckValue = document.getElementById('luckValue');
    const luckDescription = document.getElementById('luckDescription');
    const strategyPrompt = document.getElementById('strategyPrompt');
    const entryFee = document.getElementById('entryFee');

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    // Form validation
    function validateForm() {
        const isWalletConnected = walletStatus.classList.contains('wallet-connected');
        const isPromptValid = strategyPrompt.value.trim().length >= 10;
        const isFeeValid = parseFloat(entryFee.value) >= 0.01;

        createGameBtn.disabled = !(isWalletConnected && isPromptValid && isFeeValid);

        // Add visual feedback to button
        if (createGameBtn.disabled) {
            createGameBtn.style.opacity = '0.6';
            createGameBtn.style.transform = 'scale(1)';
        } else {
            createGameBtn.style.opacity = '1';
            createGameBtn.style.transform = 'scale(1.02)';
        }
    }

    // Event Listeners
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', function() {
            // Simulate wallet connection (in real app, this would connect to Phantom/Solflare)
            connectWalletBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                connectWalletBtn.style.transform = 'scale(1)';

                walletStatus.classList.remove('wallet-disconnected');
                walletStatus.classList.add('wallet-connected');
                walletStatus.innerHTML = '<i class="fas fa-wallet"></i><span>Connected</span><button id="disconnectWallet">Disconnect</button>';

                // Update disconnect button
                const disconnectBtn = walletStatus.querySelector('#disconnectWallet');
                if (disconnectBtn) {
                    disconnectBtn.addEventListener('click', function() {
                        walletStatus.classList.remove('wallet-connected');
                        walletStatus.classList.add('wallet-disconnected');
                        walletStatus.innerHTML = '<i class="fas fa-wallet"></i><span>Not connected</span><button id="connectWallet">Connect Wallet</button>';
                        validateForm();
                    });
                }

                validateForm();
            }, 100);
        });
    }

    if (strategyPrompt) {
        strategyPrompt.addEventListener('input', function() {
            validateForm();
            // Add character counter feedback
            const remaining = 200 - this.value.length;
            if (remaining < 0) {
                this.style.borderColor = 'rgba(255, 0, 0, 0.5)';
            } else if (remaining < 20) {
                this.style.borderColor = 'rgba(255, 165, 0, 0.5)';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    if (entryFee) {
        entryFee.addEventListener('input', validateForm);
    }

    // Luck Roll Simulation with visual effects
    if (rollLuckBtn) {
        rollLuckBtn.addEventListener('click', function() {
            // Disable button during roll
            rollLuckBtn.disabled = true;
            rollLuckBtn.textContent = 'Rolling...';
            rollLuckBtn.style.transform = 'scale(0.95)';

            // Simulate luck roll (in real app, this would be on-chain)
            setTimeout(() => {
                const luckRoll = Math.floor(Math.random() * 40) + 10; // 10-50%
                luckValue.textContent = `+${luckRoll}%`;

                let description = '';
                if (luckRoll >= 40) {
                    description = 'Exceptional luck! Significant bidding advantage.';
                } else if (luckRoll >= 30) {
                    description = 'Great luck! Notable improvement to bidding power.';
                } else if (luckRoll >= 20) {
                    description = 'Good luck! Moderate boost to your agent.';
                } else {
                    description = 'Decent luck! Small but meaningful edge.';
                }

                luckDescription.textContent = description;
                luckRollSection.style.display = 'block';

                // Add pulse animation to luck value
                luckValue.style.animation = 'pulse 1.5s infinite';

                rollLuckBtn.disabled = false;
                rollLuckBtn.textContent = 'Roll Luck Edge';
                rollLuckBtn.style.transform = 'scale(1)';
            }, 2000);
        });
    }

    // Create Game Button
    if (createGameBtn) {
        createGameBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Add click animation
            this.style.transform = 'scale(0.95)';

            // Simulate game creation
            setTimeout(() => {
                this.style.transform = 'scale(1)';

                // Show success feedback
                const originalText = this.textContent;
                this.textContent = 'Game Created!';
                this.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                }, 1500);

                // Reset form
                strategyPrompt.value = '';
                entryFee.value = '';
                luckRollSection.style.display = 'none';
                luckValue.textContent = '-';
                luckValue.style.animation = '';
                luckDescription.textContent = 'Waiting for roll...';

                validateForm();

                // In a real app, this would redirect to the game dashboard
            }, 150);
        });
    }

    // Tab Switching with animations
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Show corresponding tab content with fade effect
            const tabId = this.getAttribute('data-tab') + '-tab';
            const tabContent = document.getElementById(tabId);
            tabContent.classList.add('active');

            // Trigger reflow for animation
            tabContent.offsetHeight;
            tabContent.style.opacity = '0';
            setTimeout(() => {
                tabContent.style.opacity = '1';
            }, 50);
        });
    });

    // Mobile Menu (if we had one)
    // In a full implementation, we'd add a hamburger menu for mobile

    // Initialize form validation on load
    validateForm();

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        if (scrollY > 50 && !header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        } else if (scrollY <= 50 && header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    });

    // Add particle animation to hero section
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // Create floating particles
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = `particle particle-${i+1}`;
            heroImage.querySelector('.orbital-particles').appendChild(particle);
        }
    }

    // Add hover effects to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        });
    });

    // Add hover effects to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Mock data for demonstration (in real app, this would come from blockchain)
const mockGames = [
    {
        id: 1,
        name: "Alpha Test Game",
        entryFee: "0.5 SOL",
        duration: "15m",
        players: 8,
        pot: "4.0 SOL",
        status: "active",
        timeLeft: "12m 34s"
    },
    {
        id: 2,
        name: "Beta Battle Royale",
        entryFee: "1.0 SOL",
        duration: "30m",
        players: 12,
        pot: "12.0 SOL",
        status: "waiting",
        timeLeft: "Starting in 2m"
    }
];

// Function to populate game cards (would be called with real data)
function populateGames() {
    const gamesGrid = document.querySelector('.games-grid');
    if (!gamesGrid) return;

    // Clear placeholder if we have games
    const placeholder = gamesGrid.querySelector('.placeholder');
    if (placeholder && mockGames.length > 0) {
        placeholder.remove();
    }

    // Add game cards
    mockGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card glass';
        gameCard.innerHTML = `
            <div class="game-status ${game.status}">${game.status.toUpperCase()}</div>
            <h3>${game.name}</h3>
            <p><strong>Entry Fee:</strong> ${game.entryFee}</p>
            <p><strong>Duration:</strong> ${game.duration}</p>
            <p><strong>Players:</strong> ${game.players}</p>
            <p><strong>Pot:</strong> ${game.pot}</p>
            <p><strong>Time Left:</strong> ${game.timeLeft}</p>
            ${game.status === 'active' ? `<button class="btn-primary">Join Game</button>` : ''}
        `;
        gamesGrid.appendChild(gameCard);
    });
}

// Call populateGames on load if we had real data
// populateGames();

// Add CSS animations for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    .particle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(102, 126, 234, 0.6);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
        pointer-events: none;
    }

    .particle-2 {
        width: 8px;
        height: 8px;
        background: rgba(0, 242, 254, 0.6);
        animation-delay: 2s;
        animation-duration: 8s;
    }

    .particle-3 {
        width: 4px;
        height: 4px;
        background: rgba(255, 100, 255, 0.6);
        animation-delay: 4s;
        animation-duration: 4s;
    }

    .orbital-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }

    .central-agent {
        position: relative;
        z-index: 2;
        animation: float 4s ease-in-out infinite;
    }

    .central-agent i {
        text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }
`;
document.head.appendChild(style);