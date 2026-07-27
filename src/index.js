import { renderBoard } from "./dom.js";
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
            // render the cell
            break;
            
    
        case 'hit':
            console.log(('its a hit'));
            // render the cell
            break;

        case 'sunk':
            console.log(('its a sunk'));
            // render the cell
            break;
    
        case 'invalid':
            console.log(('its invalid'));
            // do nothing
            break;
    }


    attack = game.playerTwo.randomAttack(game.playerOne.board)


    return attack
}

game.playerOne.randomPlaceShip(game.shipsByLength)
game.playerTwo.randomPlaceShip(game.shipsByLength)



const mainDiv = document.querySelector('.main') 
const boardPlayerOne = renderBoard(game.playerOne.board, game.playerOne.name)
const boardPlayerTwo = renderBoard(game.playerTwo.board, game.playerTwo.name, attackCell)

mainDiv.append(boardPlayerOne, boardPlayerTwo)
