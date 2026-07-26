export function renderBoard(board, playerName, onCellClick) {
    const boardEl = document.createElement('div')
    boardEl.classList.add('board')
    boardEl.classList.add(playerName)

    boardEl.addEventListener('click', (e)=> {
        if (!e.target.classList.contains('cell')) {
            return
        }
        const cell = e.target
        const x =  Number(cell.dataset.x)
        const y = Number(cell.dataset.y)
        onCellClick(x, y)
    })

    for (let i = 0; i < board.rows; i++) {       
        for (let j = 0; j < board.colums; j++) {
            const cellEL = document.createElement('div')
            cellEL.dataset.x = i
            cellEL.dataset.y = j
            cellEL.setAttribute('class', 'cell')
            boardEl.append(cellEL)
        }
    }
    return boardEl
}