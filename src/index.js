import { renderBoard } from "./dom.js";
import { Game } from "./game.js";
import "./style.css"

console.log("Hello Odin!");


const game = new Game('aurel', 'computer', [5,4,3,3,2])

const mainDiv = document.querySelector('.main') 
const boardPlayerOne = renderBoard(game.playerOne.board, game.playerOne.name)

mainDiv.append(boardPlayerOne)
