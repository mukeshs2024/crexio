# API Reference

## REST API (Express)
- `GET /health`: Health check.
- `POST /api/create-room`: Instantiates a new auction room. Returns `roomCode` and `hostToken`.
- `GET /api/public-rooms`: Retrieves active public rooms.
- `GET /api/room/:roomCode`: Retrieves current serialized room state.
- `POST /api/analysis/:roomCode/start`: Triggers the analytics pipeline on locked playing XIs.
- `GET /api/analysis/:roomCode/results`: Returns the computed AnalyticsResult object for all teams.

## Socket.io Events
### Client to Server
- `join_room`: Connect to a room.
- `claim_team`: Take ownership of an IPL franchise.
- `bid`: Attempt to place a bid on the current player.
- `host_action`: Host-only actions (start, pause, resume, skip).
- `submit_playing_xii`: Lock a final 12-man squad for analysis.

### Server to Client
- `room_state`: Full state push.
- `bid_rejected` / `action_rejected`: Error notifications.
- `team_confirmed`: Acknowledges ownership.
