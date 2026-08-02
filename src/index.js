import { initGame, showMenu, startGame } from "./controller.js";
import { Game } from "./game.js";
import "./style.css"

console.log("Hello Odin!");



showMenu()
// initGame()
// startGame()

const game = new Game("test", 'player2', [5,4,3,3,2]);

console.log(game);
game.placeShipByplayer(game.playerOne, 5, 0, 0, 'horizontal')
console.log(game.playerOne.board.printBoard());
game.playerOne.board.removeShip(0, 0)
console.log(game.playerOne.board.printBoard());
