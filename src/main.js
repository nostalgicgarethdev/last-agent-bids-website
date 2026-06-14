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
    const treasurySplit = document.getElementById('treasurySplit');

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
        const isSplitValid = parseInt(treasurySplit.value) >= 0 && parseInt(treasurySplit.value) <= 90;

        createGameBtn.disabled = !(isWalletConnected && isPromptValid && isFeeValid && isSplitValid);

        // Add visual feedback to button
        if (createGameBtn.disabled) {
            createGameBtn.style.opacity = '0.6';
            createGameBtn.style.transform = 'scale(1)';
        } else {
            createGameBtn.style.opacity = '1';
            createGameBtn.style.transform = 'scale(1.02)';
        }
    }

    // Wallet Connection Logic using Solana Wallet Adapter
    if (connectWalletBtn) {
        // Check if wallet adapter libraries are loaded
        if (typeof solanaWeb3 === 'undefined' || typeof solanaWalletAdapterBase === 'undefined' || typeof solanaWalletAdapterWallets === 'undefined') {
            console.warn('Solana wallet adapter libraries not loaded. Using simulation.');
            // Fallback to simple simulation for development when libraries aren't loaded
            connectWalletBtn.addEventListener('click', function() {
                connectWalletBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    connectWalletBtn.style.transform = 'scale(1)';
                }, 100);

                // Toggle connection state
                const isConnected = walletStatus.classList.contains('wallet-connected');

                if (isConnected) {
                    // Disconnect
                    walletStatus.classList.remove('wallet-connected');
                    walletStatus.classList.add('wallet-disconnected');
                    walletStatus.innerHTML = `
                        <div class="wallet-content">
                            <div class="wallet-icon">
                                <i class="fas fa-wallet"></i>
                            </div>
                            <div class="wallet-text">
                                <div class="wallet-status-text">Not connected</div>
                                <div class="wallet-status-detail">Connect your Solana wallet to start</div>
                            </div>
                            <div class="wallet-action">
                                <button id="connectWallet">Connect Wallet</button>
                            </div>
                        </div>
                    `;
                } else {
                    // Connect
                    walletStatus.classList.remove('wallet-disconnected');
                    walletStatus.classList.add('wallet-connected');
                    walletStatus.innerHTML = `
                        <div class="wallet-content">
                            <div class="wallet-icon">
                                <i class="fas fa-wallet"></i>
                            </div>
                            <div class="wallet-text">
                                <div class="wallet-status-text">Connected</div>
                                <div class="wallet-status-detail">Your Solana wallet is connected</div>
                            </div>
                            <div class="wallet-action">
                                <button id="disconnectWallet">Disconnect</button>
                            </div>
                        </div>
                    `;

                    // Show luck roll section when wallet connects
                    const luckRollSection = document.getElementById('luckRollSection');
                    if (luckRollSection) {
                        luckRollSection.style.display = 'block';
                    }
                }

                validateForm();
            });
            return;
        }

        // Initialize wallet adapters
        try {
            const { WalletAdapterNetwork } = solanaWalletAdapterBase;
            const wallets = solanaWalletAdapterWallets;
            
            const walletAdapter = new solanaWalletAdapterBase.WindowWalletAdapter({
                wallets: [
                    new wallets.PhantomWalletAdapter(),
                    new wallets.SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet })
                ],
                autoConnect: true
            });

            // Connect wallet button handler
            connectWalletBtn.addEventListener('click', async () => {
                try {
                    connectWalletBtn.disabled = true;
                    connectWalletBtn.style.transform = 'scale(0.95)';
                    
                    await walletAdapter.connect();
                    
                    connectWalletBtn.style.transform = 'scale(1)';
                    setTimeout(() => {
                        connectWalletBtn.disabled = false;
                    }, 300);
                    
                    updateWalletUI(true, walletAdapter);
                    validateForm();

                    // Show luck roll section when wallet connects
                    const luckRollSection = document.getElementById('luckRollSection');
                    if (luckRollSection) {
                        luckRollSection.style.display = 'block';
                    }
                } catch (error) {
                    console.error('Wallet connection error:', error);
                    connectWalletBtn.disabled = false;
                    connectWalletBtn.style.transform = 'scale(1)';
                    alert('Failed to connect wallet. Please check your wallet extension and try again.');
                }
            });

            // Handle connection events
            walletAdapter.on('connect', () => {
                updateWalletUI(true, walletAdapter);
                validateForm();

                // Show luck roll section when wallet connects
                const luckRollSection = document.getElementById('luckRollSection');
                if (luckRollSection) {
                    luckRollSection.style.display = 'block';
                }
            });

            walletAdapter.on('disconnect', () => {
                updateWalletUI(false, walletAdapter);
                validateForm();
            });

            // Initialize UI
            updateWalletUI(walletAdapter.connected, walletAdapter);
        } catch (error) {
            console.error('Failed to initialize wallet adapter:', error);
            // Fallback to simulation
            connectWalletBtn.addEventListener('click', function() {
                connectWalletBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    connectWalletBtn.style.transform = 'scale(1)';
                }, 100);
                
                const isConnected = walletStatus.classList.contains('wallet-connected');
                
                if (isConnected) {
                    // Disconnect
                    walletStatus.classList.remove('wallet-connected');
                    walletStatus.classList.add('wallet-disconnected');
                    walletStatus.innerHTML = `
                        <div class="wallet-content">
                            <div class="wallet-icon">
                                <i class="fas fa-wallet"></i>
                            </div>
                            <div class="wallet-text">
                                <div class="wallet-status-text">Not connected</div>
                                <div class="wallet-status-detail">Connect your Solana wallet to start</div>
                            </div>
                            <div class="wallet-action">
                                <button id="connectWallet">Connect Wallet</button>
                            </div>
                        </div>
                    `;
                } else {
                    // Connect
                    walletStatus.classList.remove('wallet-disconnected');
                    walletStatus.classList.add('wallet-connected');
                    walletStatus.innerHTML = `
                        <div class="wallet-content">
                            <div class="wallet-icon">
                                <i class="fas fa-wallet"></i>
                            </div>
                            <div class="wallet-text">
                                <div class="wallet-status-text">Connected</div>
                                <div class="wallet-status-detail">Your Solana wallet is connected</div>
                            </div>
                            <div class="wallet-action">
                                <button id="disconnectWallet">Disconnect</button>
                            </div>
                        </div>
                    `;
                }
                
                validateForm();
            });
        }
    }

    function updateWalletUI(isConnected, walletAdapter) {
        if (isConnected) {
            walletStatus.classList.remove('wallet-disconnected');
            walletStatus.classList.add('wallet-connected');
            
            let walletAddress = 'Connecting...';
            if (walletAdapter.publicKey) {
                const addr = walletAdapter.publicKey.toString();
                walletAddress = addr.substring(0, 4) + '...' + addr.substring(addr.length - 4);
            }
            
            walletStatus.innerHTML = `
                <div class="wallet-content">
                    <div class="wallet-icon">
                        <i class="fas fa-wallet"></i>
                    </div>
                    <div class="wallet-text">
                        <div class="wallet-status-text">Connected</div>
                        <div class="wallet-status-detail">Wallet: ${walletAddress}</div>
                    </div>
                    <div class="wallet-action">
                        <button id="disconnectWallet">Disconnect</button>
                    </div>
                </div>
            `;
            
            // Add disconnect listener
            setTimeout(() => {
                const disconnectBtn = walletStatus.querySelector('#disconnectWallet');
                if (disconnectBtn) {
                    disconnectBtn.addEventListener('click', async () => {
                        try {
                            await walletAdapter.disconnect();
                        } catch (error) {
                            console.error('Disconnect error:', error);
                        }
                    });
                }
            }, 100);
        } else {
            walletStatus.classList.remove('wallet-connected');
            walletStatus.classList.add('wallet-disconnected');
            walletStatus.innerHTML = `
                <div class="wallet-content">
                    <div class="wallet-icon">
                        <i class="fas fa-wallet"></i>
                    </div>
                    <div class="wallet-text">
                        <div class="wallet-status-text">Not connected</div>
                        <div class="wallet-status-detail">Connect your Solana wallet to start</div>
                    </div>
                    <div class="wallet-action">
                        <button id="connectWallet">Connect Wallet</button>
                    </div>
                </div>
            `;
            
            // Add connect listener
            setTimeout(() => {
                const connectBtn = walletStatus.querySelector('#connectWallet');
                if (connectBtn) {
                    connectBtn.addEventListener('click', async () => {
                        try {
                            await walletAdapter.connect();
                        } catch (error) {
                            console.error('Connect error:', error);
                        }
                    });
                }
            }, 100);
        }
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
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
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

    // Modal Functionality
    const walletModal = document.getElementById('walletModal');
    const howToPlayModal = document.getElementById('howToPlayModal');
    const walletModalClose = document.getElementById('walletModalClose');
    const howToPlayModalClose = document.getElementById('howToPlayModalClose');
    const howToPlayModalGotIt = document.getElementById('howToPlayModalGotIt');
    const walletModalConnect = document.getElementById('walletModalConnect');

    // Open wallet modal
    if (connectWalletBtn && walletModal) {
        connectWalletBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default wallet connection for now
            walletModal.style.display = 'block';
        });
    }

    // Open how to play modal
    if (learnMoreBtn && howToPlayModal) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default scroll behavior
            howToPlayModal.style.display = 'block';
        });
    }

    // Close modals
    if (walletModalClose && walletModal) {
        walletModalClose.addEventListener('click', function() {
            walletModal.style.display = 'none';
        });
    }

    if (howToPlayModalClose && howToPlayModal) {
        howToPlayModalClose.addEventListener('click', function() {
            howToPlayModal.style.display = 'none';
        });
    }

    if (howToPlayModalGotIt && howToPlayModal) {
        howToPlayModalGotIt.addEventListener('click', function() {
            howToPlayModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside content
    window.addEventListener('click', function(event) {
        if (event.target === walletModal) {
            walletModal.style.display = 'none';
        }
        if (event.target === howToPlayModal) {
            howToPlayModal.style.display = 'none';
        }
    });

    // Wallet connection from modal (reuses existing wallet connection logic)
    if (walletModalConnect) {
        walletModalConnect.addEventListener('click', function() {
            // Trigger the actual wallet connection
            walletModal.style.display = 'none';

            // Trigger wallet connection using existing logic
            if (typeof solanaWeb3 === 'undefined' || typeof solanaWalletAdapterBase === 'undefined' || typeof solanaWalletAdapterWallets === 'undefined') {
                // Fallback to simulation
                connectWalletBtn.click();
            } else {
                // Use real wallet adapter
                connectWalletBtn.click();
            }
        });
    }

    // Luck Roll Button Handler
    if (rollLuckBtn) {
        rollLuckBtn.addEventListener('click', function() {
            rollLuckBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                rollLuckBtn.style.transform = 'scale(1)';
            }, 100);

            // Generate random luck roll (10-50% boost as mentioned in HTML comments)
            const luckRoll = Math.floor(Math.random() * 41) + 10; // 10-50 inclusive
            luckValue.textContent = `+${luckRoll}%`;

            // Set description based on roll value
            let description;
            if (luckRoll >= 40) {
                description = "Exceptional luck! Your agent gets a significant boost.";
            } else if (luckRoll >= 30) {
                description = "Great luck! Your agent receives a strong advantage.";
            } else if (luckRoll >= 20) {
                description = "Good luck! Your agent gains a modest edge.";
            } else {
                description = "Some luck! Your agent gets a slight advantage.";
            }
            luckDescription.textContent = description;

            // Show some visual feedback on the luck result container
            const luckResult = document.querySelector('.luck-result');
            luckResult.style.transform = 'scale(1.05)';
            setTimeout(() => {
                luckResult.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // Create Game Form Submission Handler
    if (createGameBtn) {
        createGameBtn.addEventListener('click', function() {
            // Only proceed if button is not disabled (form is valid)
            if (!createGameBtn.disabled) {
                createGameBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    createGameBtn.style.transform = 'scale(1)';
                }, 100);

                // Collect form data
                const entryFeeVal = parseFloat(entryFee.value);
                const gameDurationVal = gameDuration.value;
                const strategyPromptVal = strategyPrompt.value.trim();
                const treasurySplitVal = parseInt(treasurySplit.value);
                const luckRollVal = luckValue.textContent;

                // Create new game object
                const newGame = {
                    id: Date.now(), // Simple ID generation for demo
                    name: `Agent Game ${mockGames.length + 1}`,
                    entryFee: `${entryFeeVal} SOL`,
                    duration: gameDurationVal,
                    players: 1, // Creator only for now, would increase as others join
                    pot: `${(entryFeeVal * 1).toFixed(1)} SOL`, // Simplified
                    status: "active",
                    timeLeft: gameDurationVal + "m",
                    luck: luckRollVal,
                    strategy: strategyPromptVal.substring(0, 50) + (strategyPromptVal.length > 50 ? "..." : "")
                };

                // Add to mock games array
                mockGames.push(newGame);

                // Update dashboard to show the new game
                populateGames();

                // Show success feedback
                alert('Game created successfully! Your agent is now competing.');

                // Optionally reset form or luck roll
                // strategyPrompt.value = '';
                // luckValue.textContent = '-';
                // luckDescription.textContent = 'Waiting for roll...';
            }
        });
    }

    // Call populateGames on load if we had real data
    populateGames();
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

    // Clear all existing content
    gamesGrid.innerHTML = '';

    // Add placeholder if no games, otherwise add game cards
    if (mockGames.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'game-card placeholder glass';
        placeholder.innerHTML = `
            <div class="game-status">No active games</div>
            <p>Be the first to create a game!</p>
            <button class="btn-outline" id="createFirstGame">Create Your First Game</button>
        `;
        gamesGrid.appendChild(placeholder);
    } else {
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
}

// Call populateGames on load if we had real data
populateGames();

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