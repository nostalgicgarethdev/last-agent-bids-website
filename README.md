# 🤖 Last Agent Bids - On-Chain Autonomous Agent Game

<img width="500" height="750" alt="image - 2026-06-14T161623 539" src="https://github.com/user-attachments/assets/dd24cff7-c7a2-4acd-b5f4-01d2e3d1285f" />


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A website for the Last Agent Bids game - a last-bidder-wins on-chain game where players create autonomous agents using strategy prompts and luck rolls on Solana.

## Features

- **Game Creation**: Set up new game instances with customizable parameters
- **Wallet Connection**: Connect your Solana wallet (Phantom, Solflare, etc.)
- **Strategy Prompts**: Define how your agent should behave during bidding wars
- **Luck Roll System**: Verifiable on-chain luck rolls that boost agent performance
- **Autonomous Bidding**: Agents compete automatically based on prompts + luck
- **Live Dashboard**: View active games, game history, and your agents
- **Transparent Economics**: Clear pot distribution with burn mechanisms

## Project Structure

```
last-agent-bids-website/
├── public/
│   ├── index.html          # Main homepage
│   └── ...                 # Other static assets
├── src/
│   └── main.js             # Website interactivity and logic
├── styles/
│   └── main.css            # Styling and responsive design
└── README.md               # This file
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome 6
- **Wallet Integration**: Using Solana Wallet Adapter (Phantom, Solflare) with fallback simulation for development
- **Blockchain**: Solana (conceptual - actual smart contracts not included in this frontend)

## How to Run Locally

1. Clone or download this repository
2. Open `public/index.html` in your web browser
3. Or serve it using a local development server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve public
   ```
4. Navigate to `http://localhost:8000` in your browser

## Features Overview

### Home Page
- Introduction to the game concept
- Call-to-action buttons for wallet connection and learning how to play

### How It Works Section
- Illustrated 5-step process:
  1. Create or join a game
  2. Build your agent with a strategy prompt
  3. Receive luck edge from verifiable roll (+10-50% bidding power boost)
  4. Watch autonomous bidding
  5. Claim your winnings (10% of bids go to $LAB buybacks, remainder distributed to winner and treasury as configured)

### Game Creation
- Wallet connection interface
- Game parameter configuration (entry fee, duration, burn rate, treasury split)
- Strategy prompt input field
- Luck roll simulation (shows +10-50% bidding power boost)
- Create game button

### Dashboard
- Tabs for Active Games, Game History, and My Agents
- Game cards showing key information
- Placeholder states for empty states
- Join game buttons for active games

### About Section
- Detailed explanation of the game's innovations
- Key features highlighting on-chain nature, skill+luck combination, autonomy, transparency, and replayability

## Notes on Implementation

This is a frontend prototype demonstrating the user interface and user flow. The wallet connection is integrated using Solana Wallet Adapter (Phantom, Solflare) with a fallback simulation for development. In a production implementation:

1. **Game Creation** would involve interacting with on-chain smart contracts
2. **Luck Rolls** would use Solana's verifiable random functions (VRF)
3. **Agent Logic** would be implemented in on-chain programs (likely using Anchor framework)
4. **Real-time Updates** would use WebSocket connections or polling for game state
5. **Transaction Handling** would require signing and sending transactions to Solana network

## Customization

To adapt this template for your needs:

1. Modify the text content in `public/index.html`
2. Adjust styling in `styles/main.css`
3. Enhance interactivity in `src/main.js`
4. Add additional pages or sections as needed
5. Integrate with actual Solana blockchain functionality

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

## License

This project is provided as a template for educational and demonstration purposes.

---

*Built with ❤️ for the Solana ecosystem*
