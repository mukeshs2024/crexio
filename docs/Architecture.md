# Architecture

The IPL Mock Auction platform is split into two primary domains:

## 1. Frontend (Next.js 14)
- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS & Framer Motion.
- **State**: React state combined with Socket.io client bindings.
- **Pages**:
  - `/` (Home, Create/Join)
  - `/room/[roomId]/live` (Active Auction Screen)
  - `/room/[roomId]/team-builder` (Playing XII Selection)
  - `/results/[roomId]` (Final Analytics & Podiums)

## 2. Backend (Node.js + Express + Socket.io)
- **Server**: Express for REST API, Socket.io for WebSocket events.
- **Actor Model**: `RoomActor` encapsulates state mutations for a specific room. All requests are queued via a strictly serialized FIFO queue to guarantee race-condition-free bid resolutions.
- **Analytics Engine**: Written in pure TypeScript (`player-evaluator.ts`, `team-evaluator.ts`). Operates off a pre-cached JSON datastore derived from Cricsheet ball-by-ball datasets.
