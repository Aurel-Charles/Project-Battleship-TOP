import { clearDock, renderBoard, renderDock, updateBoard,renderWinner, clearWinner, renderPlayerBoardWrapper, renderMenu, renderPassScreen, renderTurnResult, renderNewGameBtn, renderOneShipInDock, createDockShip } from "./dom.js";
import { Game } from "./game.js";


function placeShipHandler(length, x, y) {
    if (placementDone) {
        return
    }
    const placed =  currentPlacingPlayer.board.placeShip(length, [x, y], orientation)
    if (placed) {
        updateBoard(currentPlacingPlayer, true)
        const allShipPlaced = checkPlacementShip(shipInDock, currentPlacingPlayer.board.numberOfShips)
        if (allShipPlaced) {
            onPlacementCommplete()
            // placementDone = true
            // clearDock()

        }
        return true
    }

    return false
}

function previewHandler(length, x, y) {
    const preview =  currentPlacingPlayer.board.checkPlace(length, [x, y], orientation)
    const cellPreviewCoor = []
    if (preview) {
        for (let i = 0; i < length; i++) {
            if (orientation === 'horizontal') {
                cellPreviewCoor.push([x, y+i])
            }
            if (orientation === 'vertical') {
                cellPreviewCoor.push([x+i, y])
            }
        }
    }

    return cellPreviewCoor
}

function attackCell(targetPlayer, x,y) {
    if (awaitingNextPlayer) {
        return
    }
    if (gameOver || !placementDone) {
        return
    }
    let attack
    let resultText
    if (targetPlayer === game.currentPlayer) return
    attack = game.currentPlayer.attack(targetPlayer.board, x, y)


    switch (attack) {
        case 'miss':
            resultText = "It a miss"
            updateBoard(targetPlayer)
            break;
            
    
        case 'hit':
            resultText = "Great it's a hit"
            updateBoard(targetPlayer)
            break;

        case 'sunk':
            resultText = "Nice the ship is down!"
            updateBoard(targetPlayer)
            break;
    
        case 'invalid':
            return
    }

    if (targetPlayer.board.allShipSunk) {
        awaitingNextPlayer 
        gameOver = true
        resultText = 'You win'
        winner = game.currentPlayer.name
        const resutDiv = renderTurnResult(resultText, ()=> showResultGame(),true, true)
        mainDiv.append(resutDiv)
        // renderWinner(winnerTextEl, winner)
        return
    }
    
    
    game.currentPlayer = targetPlayer
    
    if (game.currentPlayer.isComputer) {
        computerPlay()
        renderBattleView(game.playerOne)
        const resutDiv = renderTurnResult(resultText, ()=> showPassScreen(game.currentPlayer), false )
        mainDiv.append(resutDiv)
    }
    else if (game.currentPlayer.isComputer === false) {
        // showPassScreen(game.currentPlayer)
        const resutDiv = renderTurnResult(resultText, ()=> showPassScreen(game.currentPlayer) )
        mainDiv.append(resutDiv)
        awaitingNextPlayer = true
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

function onPlacementCommplete(){
    if (currentPlacingPlayer === game.playerOne && game.playerTwo.isComputer) {
        console.log('player ONE finihed placing ship - mode is: vs computer');
        game.playerTwo.randomPlaceShip(game.shipsByLength)
        startBattle()
    }
    else if (currentPlacingPlayer === game.playerOne && !game.playerTwo.isComputer ) {
        console.log('player ONE finihed placing ship - mode is: vs Human');
        currentPlacingPlayer = game.playerTwo
        showPlayerPlacement(game.playerTwo.board, game.playerTwo.name)
        
    }
    else if (currentPlacingPlayer === game.playerTwo) {
        console.log('player TWO finihed placing ship - mode is: vs human');
        startBattle()
    }

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
let currentPlacingPlayer
let awaitingNextPlayer

export function initGame(mode) {
    // init the game
    shipInDock = [5,4,3,3,2]
    if (mode === 'vs-human') {
        game = new Game('Player1', 'Player2', shipInDock, true)
    }
    else{
        game = new Game('Player1', 'Computer', shipInDock)
    }
    gameOver = false
    winner = null
    orientation = 'horizontal'
    placementDone = false
    currentPlacingPlayer = game.playerOne

    showPlayerPlacement(game.playerOne.board, game.playerOne.name)

}

let mainDiv
let winnerTextEl

export function showMenu() {
    mainDiv = document.querySelector('.main') 
    mainDiv.replaceChildren()

    const menu = renderMenu(initGame)

    mainDiv.append(menu)

}



function startBattle() {
    placementDone = true
    if (game.playerTwo.isComputer) {
        renderBattleView(game.playerOne)     // vs-computer : direct, pas de passage
    } else {
        showPassScreen(game.currentPlayer)    // vs-human : passage vers le joueur 1
    }
}



function showPlayerPlacement(board, playerName) {
    
    mainDiv = document.querySelector('.main') 
    mainDiv.replaceChildren()
    mainDiv.classList.add('main-placement')
    
    const text = document.createElement('p')
    text.textContent = `${playerName}, place your ships! - To replace a ship, clic on it on the board`
    text.classList.add('text-player-place')

    // render dock 
    const dockEl = renderDock(shipInDock, onRotate)
    mainDiv.append(text, dockEl)
    
    // render boards on page
    const boardPlayer = renderPlayerBoardWrapper(board, playerName, removeShipHandler, placeShipHandler, previewHandler)
    boardPlayer.classList.add('placement')

    mainDiv.append(boardPlayer)
}


function computerPlay(){
    game.currentPlayer.randomAttack(game.playerOne.board)
    updateBoard(game.playerOne, true)
    if (game.playerOne.board.allShipSunk) {
        gameOver = true
        winner = game.currentPlayer.name
        renderWinner(winnerTextEl, winner)
        return
    }
    game.currentPlayer = game.playerOne
}


function renderBattleView(viewingPlayer){
    awaitingNextPlayer = false
    let opponent
    if (viewingPlayer === game.playerOne) {
        opponent = game.playerTwo
    }else{
        opponent = game.playerOne
    }
 
    mainDiv = document.querySelector('.main') 
    mainDiv.replaceChildren()

    const text = document.createElement('p')
    text.textContent = `${viewingPlayer.name}, it's your turn to chose a cell !!! Try to find a ship on ${opponent.name}'s board`
    text.classList.add('text-player-play')
    
    // render boards on page
    const boardViewingPlayer = renderPlayerBoardWrapper(viewingPlayer.board, viewingPlayer.name,
        (x, y) => attackCell(viewingPlayer, x, y))
    const boardOpponent = renderPlayerBoardWrapper(opponent.board, opponent.name,
        (x, y) => attackCell(opponent, x, y))
    
    mainDiv.append(text, boardViewingPlayer, boardOpponent)
    
    updateBoard(viewingPlayer, true)
    updateBoard(opponent)

    // render button reset game
    const btnResetGame = renderNewGameBtn(()=> showMenu())
    mainDiv.append(btnResetGame)
    
    const winnerEl = document.createElement('div')
    winnerEl.classList.add('winner')
    winnerTextEl = document.createElement('p')
    winnerTextEl.classList.add('winner-text')
    winnerEl.append(winnerTextEl)
    mainDiv.append(winnerEl)
}


function showPassScreen(player) {
    mainDiv = document.querySelector('.main') 
    mainDiv.replaceChildren()

    const passeScreen = renderPassScreen(player.name, ()=> renderBattleView(player) )
    
    mainDiv.append(passeScreen)
}

function showResultGame() {
    mainDiv = document.querySelector('.main') 
    mainDiv.replaceChildren()

    const winnerMsg = document.createElement('p')
    winnerMsg.textContent = `${winner} wins!`
    winnerMsg.classList.add('winning-msg')
    // render boards on page
    const boardPlayerOne = renderPlayerBoardWrapper(game.playerOne.board, game.playerOne.name, null)
    const boardPlayerTwo = renderPlayerBoardWrapper(game.playerTwo.board, game.playerTwo.name, null)
    if (winner === game.playerOne.name) {
        boardPlayerOne.classList.add('winner-board')
    }
    else{
        boardPlayerTwo.classList.add('winner-board')
    }
    
    const btnResetGame = renderNewGameBtn(()=> showMenu())

    mainDiv.append(winnerMsg, boardPlayerOne, boardPlayerTwo,btnResetGame)
    
    updateBoard(game.playerOne, true)
    updateBoard(game.playerTwo, true)
}

function removeShipHandler(x, y){
    const length = currentPlacingPlayer.board.removeShip(x, y)
    if (length) {
        updateBoard(currentPlacingPlayer, true)
        const ship = createDockShip(length)
        if (orientation === 'horizontal') {
            ship.className = 'ship-in-dock ship-in-dock-h'
        }
        else{
            ship.className = 'ship-in-dock ship-in-dock-v'
        }
        const dock = document.querySelector('#ship-dock-wrapper')
        dock.append(ship)
    }
}