# Battleship

A browser implementation of the classic **Battleship** game, built with vanilla
JavaScript, ES6 modules and Webpack. Play against the computer or against a
friend on the same device (pass-and-play). Made as part of
[The Odin Project](https://www.theodinproject.com/) curriculum.

**Live demo:** https://aurel-charles.github.io/Project-Battleship-TOP/
&nbsp;·&nbsp; **Repo:** https://github.com/Aurel-Charles/Project-Battleship-TOP

## Features

- **Two game modes**
  - **Human vs Computer** — the AI places its fleet randomly and fires back on its turn.
  - **Human vs Human** — pass-and-play on a single screen, with a hand-off screen between turns to keep each fleet private.
- **Drag & drop ship placement** — drag ships from the dock onto your grid.
  - **Rotate** ships between horizontal and vertical orientation.
  - **Live placement preview** — cells highlight to show where a ship will land.
  - **Remove a misplaced ship** — click a placed ship to send it back to the dock.
- **Turn feedback** — every shot reports _hit / miss / sunk_.
- **Win detection** and an end screen that reveals both fleets.
- **New game** button to return to the mode menu at any time.

## Tech stack

- Vanilla JavaScript (ES6 modules)
- [Webpack 5](https://webpack.js.org/) (dev server + production build)
- [Jest](https://jestjs.io/) for unit testing the game logic
- Plain CSS

## Architecture

The code is split into three layers with a strict, one-way dependency flow —
**logic → controller → DOM** — so the game rules never touch the browser and
stay fully unit-testable.

```
src/
├── ship.js        # Ship: length, hits, isSunk()
├── cell.js        # Cell: value + hit state
├── board.js       # Board: placement, attacks, ship removal, state queries
├── player.js      # Player: human/computer, random placement & attacks
├── game.js        # Game: wires two players, tracks current player
├── controller.js  # Orchestration: game state, turn flow, event handlers
├── dom.js         # Rendering only: boards, dock, menu, screens (no game rules)
├── index.js       # Entry point: boots the app
├── style.css
└── template.html
```

- **Logic layer** (`ship`, `cell`, `board`, `player`, `game`) is pure — no
  `document`, no DOM. It can run in Node and is covered by tests.
- **`dom.js`** only draws things and reports user events through callbacks; it
  knows nothing about the `Game`.
- **`controller.js`** is the conductor: it holds the game state, decides whose
  turn it is, and connects user actions to the logic and back to the screen.

## Getting started

```bash
# clone
git clone https://github.com/Aurel-Charles/Project-Battleship-TOP.git
cd Project-Battleship-TOP

# install dependencies
npm install

# run the dev server (hot reload)
npm run dev
```

Then open the local address printed by Webpack (usually `http://localhost:8080`).

## Available scripts

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `npm run dev`    | Start the Webpack dev server with hot reload          |
| `npm run build`  | Produce a production build in `/dist`                 |
| `npm test`       | Run Jest in watch mode                                |
| `npm run deploy` | Build and publish to GitHub Pages (`gh-pages` branch) |

To run the test suite once (without watch mode):

```bash
npx jest
```

## Testing

The game logic is unit-tested with Jest — ship sinking, ship placement
(including out-of-bounds and overlap rules), attacks (hit / miss / invalid /
sunk), ship removal, win detection, and the `Player` helpers (with a mocked
`Math.random` for deterministic tests).

```bash
npx jest
```

## How to play

1. Choose a mode from the menu.
2. **Place your fleet**: drag each ship from the dock onto your grid. Use
   **Rotate** to change orientation, and click a placed ship to move it back to
   the dock.
3. In _Human vs Human_, the second player places their fleet next, behind a
   hand-off screen.
4. **Battle**: click a cell on the opponent's grid to fire. The result is shown,
   then play passes to the other side.
5. Sink the entire enemy fleet to win.

## Possible improvements

- Smarter computer AI (target adjacent cells after a hit)
- Persistent scores

## Acknowledgements

Built as the Battleship project from
[The Odin Project — Full Stack JavaScript](https://www.theodinproject.com/).
