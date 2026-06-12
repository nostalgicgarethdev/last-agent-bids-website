// Last Agent Bids Website JavaScript
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

    // Form validation
    function validateForm() {
        const isWalletConnected = walletStatus.classList.contains('wallet-connected');
        const isPromptValid = strategyPrompt.value.trim().length >= 10;
        const isFeeValid = parseFloat(entryFee.value) >= 0.01;

        createGameBtn.disabled = !(isWalletConnected && isPromptValid && isFeeValid);
    }

    // Event Listeners
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', function() {
            // Simulate wallet connection (in real app, this would connect to Phantom/Solflare)
            setTimeout(() => {
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
            }, 1000);
        });
    }

    if (strategyPrompt) {
        strategyPrompt.addEventListener('input', validateForm);
    }

    if (entryFee) {
        entryFee.addEventListener('input', validateForm);
    }

    // Luck Roll Simulation
    if (rollLuckBtn) {
        rollLuckBtn.addEventListener('click', function() {
            // Disable button during roll
            rollLuckBtn.disabled = true;
            rollLuckBtn.textContent = 'Rolling...';

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

                rollLuckBtn.disabled = false;
                rollLuckBtn.textContent = 'Roll Luck Edge';
            }, 2000);
        });
    }

    // Create Game Button
    if (createGameBtn) {
        createGameBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Simulate game creation
            alert('Game created successfully! Your agent has been submitted and is now competing.');

            // Reset form
            strategyPrompt.value = '';
            entryFee.value = '';
            luckRollSection.style.display = 'none';
            luckValue.textContent = '-';
            luckDescription.textContent = 'Waiting for roll...';

            // In a real app, this would redirect to the game dashboard
        });
    }

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Mobile Menu (if we had one)
    // In a full implementation, we'd add a hamburger menu for mobile

    // Initialize form validation on load
    validateForm();
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
        gameCard.className = 'game-card';
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