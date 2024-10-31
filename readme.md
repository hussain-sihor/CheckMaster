# CheckMaster 

https://github.com/user-attachments/assets/e29555dd-06ef-4762-ab9a-f80e38f7de0a

Welcome to the Real-Time Multiplayer Chess Game! This project is a fully interactive, web-based chess game with real-time multiplayer functionality, allowing many groups of two players to engage in a game of chess, with moves updated in real-time.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-Time Gameplay**: Moves are synchronized instantly for both players.
- **Matchmaking**: Easily connect with other players for a quick game.
- **In-Game Chat**: Communicate with your opponent during gameplay.
- **Move Validation**: Each move is validated to ensure compliance with chess rules.

## Technologies Used

- **Frontend**: React.js, Redux (or Context API for state management), Tailwind CSS
- **Backend**: Node.js
- **Real-Time Communication**:WS Library for instant move updates

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed on your machine

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yhussain-sihor/CheckMaster.git
   ```

2. **Install dependencies**

   Navigate to the root folder and install dependencies for both frontend and backend:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Start the Application**

   Open two terminal windows to run the server and client concurrently.

   - In the `backend` directory, run:

     ```bash
     npm run dev
     ```

   - In the `frontend` directory, run:

     ```bash
     npm run dev
     ```

   The server will run on `http://localhost:8080`, and the client will be available on `http://localhost:5173`.

## Usage

1. Start a new game by joining the matchmaking queue or inviting a friend.
2. Once matched, the game will begin, with moves synchronized in real-time between players.
3. Use the in-game chat to communicate with your opponent.

## Game Rules

- Standard chess rules apply, including check, checkmate, castling, en passant, and pawn promotion.
- Illegal moves are blocked automatically, and players are alerted.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy your game, and happy coding!

