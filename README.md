# BattleShip Game

#### A strategy type guessing game between player and computer.

<!-- [![Project Status: Inactive – The project has reached a stable, usable state but is no longer being actively developed; support/maintenance will be provided as time allows.](https://www.repostatus.org/badges/latest/inactive.svg)](https://www.repostatus.org/#inactive) -->

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
![LastCommit](https://img.shields.io/github/last-commit/BelyyBrat/battleship)
![Languages](https://img.shields.io/github/languages/top/BelyyBrat/battleship)
[![MIT license](https://img.shields.io/badge/License-MIT-orange.svg)](https://lbesson.mit-license.org/)

---

### <u>Table of Contents</u>

1. [Description](#description)
2. [Screenshots](#known-bugs)
3. [Setup/Installation Requirements](#setup/installation-requirements)
4. [Known bugs](#known-bugs)
5. [Deployed website](#deployed-website)
6. [Technology](#technology)
7. [Contact](#contact)
8. [License](#license)

---

## About the Project

1. Description

Battleship (also Battleships or Sea Battle) is a strategy type guessing game for two players. It is played on ruled grids (paper or board) on which each player's fleet of ships (including battleships) are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.

The game of Battleship is thought to have its origins in the French game L'Attaque played during World War I, although parallels have also been drawn to E. I. Horsman's 1890 game Basilinda, and the game is said to have been played by Russian officers before World War I.

The game is played on two grids, one for each player. The grids are typically square – usually 10×10 – and the individual squares in the grid are identified by letter and number. On one grid the player arranges ships and records the shots by the opponent. On the other grid the computer records their own shots.

2. Screenshots

Starting position of player's ships before battle
<image src="./public/before.png" width="800px"/>

Situation during battle
<image src="./public/after.png" width="800px"/>

3. Setup/Installation Requirements

- Download or clone this repository to your computer,
- Download and install [npm package](https://www.npmjs.com/get-npm),
- Open terminal
- Run "npm install" to install npm package
- Run "npm start" to run the application

### Prerequisites

- Understanding of Markdown and HTML languages
- Option 1: [Atom](https://nodejs.org/en/)
- Option 2: [VisualStudioCode](https://www.npmjs.com/)
- [GitHub Account](https://github.com) (Optional)

### Use

- Use preferred IDE or Text Editor to review documentation

4. Known Bugs

TypeError: Cannot read property 'filter' of undefined during battle
  118 |   };
  119 | case "REMOVE_SHIP_CELL":
  120 |   // @ts-ignore
> 121 |   const newArray = state[action.payload.player][action.payload.ship].filter(
      | ^  122 |     (cell: any) => cell !== action.payload.cell
  123 |   );
  124 |   return {

5. Deployed Website

6. Technology

- React
  - React Redux
  - React Router
  - React Slick
  - react-modal-image
- JavaScript
- TypeScript
- CSS
- Material-UI
- Markdown

7. Contact

| Author                 |     GitHub     |           Email            |
| ---------------------- | :------------: | :------------------------: |
| [Andriy Veremyeyev](#) | [belyybrat](#) | [averemyeyev@gmail.com](#) |

8. License

This software is licensed under the MIT license.

Copyright (c) 2020 **Andriy Veremyeyev**
