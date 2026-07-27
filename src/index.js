import { renderBoard, updateBoard } from "./dom.js";
import { Game } from "./game.js";
import "./style.css"

console.log("Hello Odin!");



const game = new Game('aurel', 'computer', [5,4,3,3,2])
let gameOver = false

function attackCell(x,y, isComputer = false) {
    if (gameOver) {
        return
    }
    let attack

    attack = game.playerOne.attack(game.playerTwo.board, x, y)

    switch (attack) {
        case 'miss':
            updateBoard(game.playerTwo)
            break;
            
    
        case 'hit':
            updateBoard(game.playerTwo)
            break;

        case 'sunk':
            updateBoard(game.playerTwo)
            break;
    
        case 'invalid':
            return
    }

    if (game.playerTwo.board.allShipSunk) {
        alert('player One WIN')
        gameOver = true
        return
    }
    
    
    attack = game.playerTwo.randomAttack(game.playerOne.board)
    updateBoard(game.playerOne, true)
    
    if (game.playerOne.board.allShipSunk) {
        alert('Computer WIN')
        gameOver = true
        return
    }
}

game.playerOne.randomPlaceShip(game.shipsByLength)
game.playerTwo.randomPlaceShip(game.shipsByLength)



const mainDiv = document.querySelector('.main') 
const boardPlayerOne = renderBoard(game.playerOne.board, game.playerOne.name)
const boardPlayerTwo = renderBoard(game.playerTwo.board, game.playerTwo.name, attackCell)

mainDiv.append(boardPlayerOne, boardPlayerTwo)

updateBoard(game.playerOne, true)
updateBoard(game.playerTwo)

