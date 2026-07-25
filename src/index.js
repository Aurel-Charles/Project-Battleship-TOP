import { Board, Ship } from "./gameEl.js";
import "./style.css"

console.log("Hello Odin!");


const ship = new Ship(4, 0 , false);
const board = new Board()
board.placeShip(4, [0, 1], 'vertical')
console.log(board.printBoard());
