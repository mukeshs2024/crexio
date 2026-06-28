# IPL Mock Auction Platform

A complete, real-time web application to host and simulate IPL Mock Auctions. The platform supports live bidding, squad management, and advanced AI-driven post-auction analytics evaluating squads on an exact 100-point scale.

## Features
- **Real-Time Bidding**: Powered by Socket.io, supports simultaneous bidding, host controls, timer management, and real-time ledger updates.
- **Dynamic Squad Building**: Once the auction concludes, owners can assemble their 11-man Playing XI and designate an Impact Player.
- **Advanced Analytics**: Real-time evaluation mapping auction players to live Cricsheet T20 datasets. Returns component scores (Batting, Bowling, Form, Captaincy), dynamically generated strengths/weaknesses, and Championship Probabilities.
- **Responsive UI**: Next.js frontend built with TailwindCSS and Framer Motion for a premium, sleek aesthetic.

## Quick Start
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build for production
npm run build
npm start
```
