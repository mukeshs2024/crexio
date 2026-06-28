# Analytics Engine

The Analytics Engine is the crown jewel of the platform. It takes a raw squad of 11-12 players, maps their identities to the Cricsheet database, and derives a purely deterministic 100-point score.

## Evaluation Weightage (100 Points)
- **Batting (20 points)**: Based on Top 7 batters' Impact Ratings (Runs / Strike Rate composite).
- **Bowling (20 points)**: Based on Top 5 bowlers' Impact Ratings (Wickets / Economy composite).
- **All Round (15 points)**: Averages the composite batting + bowling ratings of the top 3 all-rounders.
- **Current Form (15 points)**: Weighted 2024-2025 seasonal performance.
- **IPL Performance (10 points)**: Historical IPL dominance.
- **Overall T20 (10 points)**: Global franchise + international statistics.
- **Captaincy (5 points)**: Experience leading T20 franchises.
- **Balance (5 points)**: Role coverage (penalizes missing Wicketkeepers, missing 6th bowling options, or lack of death bowlers).

## Season Simulation
Win Probability scales directly from the Overall Rating.
- `Win %` = `50 + (OverallRating - 70)`
- `Playoff %` = `Win % * 1.5`

## Validation Rules
The engine includes logical assertions:
- Batters with 0 wickets yield `0.00` bowling impact.
- Dynamic error generation (`isInvalid` flag) if squad is missing 11 players or lacks a wicketkeeper.
