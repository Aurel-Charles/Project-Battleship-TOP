import { Board, Player, Ship } from "./gameEl.js";
import "./style.css"

console.log("Hello Odin!");

const allShipLengths = [3, 5]

const playerOne = new Player('aurel')
const playerTwo = new Player('Computer', true)

console.log(playerOne);
console.log(playerOne.randomAttack(playerTwo.board));
console.log(playerTwo.randomPlaceShip(allShipLengths));
console.log(playerTwo.board.printBoard());

