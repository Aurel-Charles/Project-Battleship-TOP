import { renderBoard, renderDock, updateBoard } from "./dom.js";
import { Game } from "./game.js";
import "./style.css"

console.log("Hello Odin!");

function placeShipHandler(length, x, y) {
    const placed =  game.playerOne.board.placeShip(length, [x, y], orientation)
    if (placed) {
        updateBoard(game.playerOne, true)
        return true
    } 
    return false
}

function attackCell(x,y, isComputer = false) {
    if (gameOver || !placementDone) {
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
        gameOver = true
        winner = game.playerOne.name
        renderWinner()
        return
    }
    
    
    attack = game.playerTwo.randomAttack(game.playerOne.board)
    updateBoard(game.playerOne, true)
    
    if (game.playerOne.board.allShipSunk) {
        gameOver = true
        winner = game.playerTwo.name
        renderWinner()
        return
    }
}

function onRotate() {
    orientation= orientation === 'horizontal'? 'vertical':'horizontal'
    console.log(orientation);
    const shipWrapperEl = document.querySelector('#ship-dock-wrapper')
    const shipEl = document.querySelectorAll('.ship-in-dock')
    console.log(shipEl, shipWrapperEl);
    
    if (orientation === 'horizontal') {
        shipWrapperEl.className = 'ship-dock-wrapper-h'
        shipEl.forEach(element => {
            element.classList.remove('ship-in-dock-v')
            element.classList.add('ship-in-dock-h') 
        });
    }
    else{
        shipWrapperEl.className = 'ship-dock-wrapper-v'
        shipEl.forEach(element => {
            element.classList.remove('ship-in-dock-h')
            element.classList.add('ship-in-dock-v') 
        });
    }
}


function resetGame(game) {
    gameOver = false
    game.playerOne.board.reset()
    game.playerTwo.board.reset()
    // game.playerOne.randomPlaceShip(game.shipsByLength)
    game.playerTwo.randomPlaceShip(game.shipsByLength)
    clearWinner(true)
}




// init the game
const shipInDock = [5,4,3,3,2]
const game = new Game('aurel', 'computer', shipInDock)
let gameOver = false
let winner
let orientation = 'horizontal'
let placementDone = false

// game.playerOne.randomPlaceShip(game.shipsByLength)
game.playerTwo.randomPlaceShip(game.shipsByLength)

const mainDiv = document.querySelector('.main') 

// render dock 
const dockEl = renderDock(shipInDock, onRotate)
mainDiv.append(dockEl)

// render boards on page
const boardPlayerOne = renderBoard(game.playerOne.board, game.playerOne.name, null, placeShipHandler)
const boardPlayerTwo = renderBoard(game.playerTwo.board, game.playerTwo.name, attackCell)

mainDiv.append(boardPlayerOne, boardPlayerTwo)

updateBoard(game.playerOne, true)
updateBoard(game.playerTwo)

// render button reset game
const btnResetGame = document.createElement('button')
btnResetGame.classList.add('btn-reset')
btnResetGame.textContent = 'Reset Game'
btnResetGame.addEventListener('click', ()=> {
    resetGame(game)
    updateBoard(game.playerOne, true)
    updateBoard(game.playerTwo)
})
mainDiv.append(btnResetGame)

const winnerEl = document.createElement('div')
winnerEl.classList.add('winner')
const winnerTextEl = document.createElement('p')
winnerTextEl.classList.add('winner-text')
winnerEl.append(winnerTextEl)
mainDiv.append(winnerEl)


// render winner div
function renderWinner() {
        winnerTextEl.textContent =  `${winner} win!!`
}
function clearWinner() {   
    winnerTextEl.textContent =  ``
}

