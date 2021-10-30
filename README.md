# You Sunk My Battleship 


## Installation

1. The game is loaded from the battleship.html file
2. The game depends on the battleship.js file which holds all the javascript.
3. The game follows normal battleship rules.
4. Local storage is required for game functionality and persistence.
5. Cookies are required for storing the recent scores.


## Running the App

1. This game uses local storage to hold all game data. The game will remain persistent when the browser closes.
2. If the browser closes, reopening the game will return to the ready page for the active turn.
3. There is a reset button to clear local storage if you desire to start a new game.
4. The game is also hosted on my personal server at http://cs1520.ericlaslo.com/page2/
5. The files in the root directory will run the game. They are a duplicate of the /WebContent version. Eclipse doesn't put then there natively. So I just made a duplicate copy, since I'd prefer to keep my project active.
6. Ocean surprises aren't fixed. They will move around during the game.
7. If you get try to place two ships in the same spot the game will reset (because I didn't have time clear them manually). So player 1 will have to re-enter positions if player 2 does it.
