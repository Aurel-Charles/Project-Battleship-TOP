import { renderBoard, updateBoard } from "./dom.js";
import { Game } from "./game.js";
import "./style.css"

console.log("Hello Odin!");



const game = new Game('aurel', 'computer', [5,4,3,3,2])

function attackCell(x,y, isComputer = false) {
    let attack

    attack = game.playerOne.attack(game.playerTwo.board, x, y)
    console.log(attack);

    switch (attack) {
        case 'miss':
            console.log(('its a miss'));
            updateBoard(game.playerTwo)
            break;
            
    
        case 'hit':
            console.log(('its a hit'));
            updateBoard(game.playerTwo)
            break;

        case 'sunk':
            console.log(('its a sunk'));
            updateBoard(game.playerTwo)
            break;
    
        case 'invalid':
            console.log(('its invalid'));
            return
    }


    attack = game.playerTwo.randomAttack(game.playerOne.board)
    updateBoard(game.playerOne, true)


    return attack
}

game.playerOne.randomPlaceShip(game.shipsByLength)
game.playerTwo.randomPlaceShip(game.shipsByLength)



const mainDiv = document.querySelector('.main') 
const boardPlayerOne = renderBoard(game.playerOne.board, game.playerOne.name)
const boardPlayerTwo = renderBoard(game.playerTwo.board, game.playerTwo.name, attackCell)

mainDiv.append(boardPlayerOne, boardPlayerTwo)

updateBoard(game.playerOne, true)
updateBoard(game.playerTwo)

