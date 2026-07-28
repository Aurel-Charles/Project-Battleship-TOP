import { clearDock, renderBoard, renderDock, updateBoard,renderWinner, clearWinner } from "./dom.js";
import { Game } from "./game.js";


function placeShipHandler(length, x, y) {
    if (placementDone) {
        return
    }
    const placed =  game.playerOne.board.placeShip(length, [x, y], orientation)
    if (placed) {
        updateBoard(game.playerOne, true)
        const allShipPlaced = checkPlacementShip(shipInDock, game.playerOne.board.numberOfShips)
        if (allShipPlaced) {
            placementDone = true
            clearDock()
        }
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
        renderWinner(winnerTextEl, winner)
        return
    }
    
    
    attack = game.playerTwo.randomAttack(game.playerOne.board)
    updateBoard(game.playerOne, true)
    
    if (game.playerOne.board.allShipSunk) {
        gameOver = true
        winner = game.playerTwo.name
        renderWinner(winnerTextEl, winner)
        return
    }
}

function onRotate() {
    orientation= orientation === 'horizontal'? 'vertical':'horizontal'
    const shipWrapperEl = document.querySelector('#ship-dock-wrapper')
    const shipEl = document.querySelectorAll('.ship-in-dock')
    
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

function checkPlacementShip(shipInDock, numberOfShips) {
    // return true or false
    return shipInDock.length === numberOfShips
}


function resetGame(game) {
    gameOver = false
    placementDone = false
    game.playerOne.board.reset()
    game.playerTwo.board.reset()
    // game.playerOne.randomPlaceShip(game.shipsByLength)
    game.playerTwo.randomPlaceShip(game.shipsByLength)
    clearWinner(winnerTextEl)
    clearDock()
    const dockEl = renderDock(shipInDock, onRotate)
    mainDiv.prepend(dockEl)
}

let shipInDock
let game
let gameOver
let winner
let orientation
let placementDone

export function initGame() {
    // init the game
    shipInDock = [5,4,3,3,2]
    game = new Game('Human', 'Comuter', shipInDock)
    gameOver = false
    winner
    orientation = 'horizontal'
    placementDone = false
}

let mainDiv
let winnerTextEl

export function startGame() {
    // game.playerOne.randomPlaceShip(game.shipsByLength)
    game.playerTwo.randomPlaceShip(game.shipsByLength)
    
    mainDiv = document.querySelector('.main') 
    
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
    winnerTextEl = document.createElement('p')
    winnerTextEl.classList.add('winner-text')
    winnerEl.append(winnerTextEl)
    mainDiv.append(winnerEl)
    
}




