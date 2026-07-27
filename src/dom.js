export function renderBoard(board, playerName, onCellClick) {
    const boardEl = document.createElement('div')
    boardEl.classList.add('board')
    boardEl.id = `board-${playerName}`

    if (onCellClick) {
        boardEl.addEventListener('click', (e)=> {
            if (!e.target.classList.contains('cell')) {
                return
            }
            const cell = e.target
            const x =  Number(cell.dataset.x)
            const y = Number(cell.dataset.y)
            onCellClick(x, y)
        })
    }

    for (let i = 0; i < board.rows; i++) {       
        for (let j = 0; j < board.colums; j++) {
            const cellEL = document.createElement('div')
            cellEL.dataset.x = i
            cellEL.dataset.y = j
            // cellEL.dataset.value = board.board[i][j].getValue()
            cellEL.setAttribute('class', 'cell')
            boardEl.append(cellEL)
        }
    }
    return boardEl
}

export function updateBoard(player, showShips = false) {
    let allCellState = player.board.getCellState()
    const boardEL = document.querySelector(`#board-${player.name}`)
    console.log(player.name);
    console.log(boardEL);
    for (let i = 0; i < allCellState.length; i++) {
        for (let j = 0; j < allCellState[i].length; j++) {
            const { hasShip, isHit } = allCellState[i][j]
            const cellEL = boardEL.querySelector(`[data-x="${i}"][data-y="${j}"]`)
            
            cellEL.className = 'cell' //reset the classe name for each update(avoid accumulating class)
            if (isHit && hasShip) {
                cellEL.classList.add('hit')
            }
            if (isHit && !hasShip) {
                cellEL.classList.add('miss')
            }
            if (!isHit && hasShip && showShips) {
                cellEL.classList.add('ship')
            }
        }
        
    }   
}