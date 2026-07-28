    let draggedShipEl = null

    export function renderBoard(board, playerName, onCellClick, onCellDrop) {
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
        if (onCellDrop) {
            boardEl.addEventListener('dragover', (e)=> {
                e.preventDefault()
            })
            boardEl.addEventListener('drop', (e)=> {
                if (!e.target.classList.contains('cell')) {
                    return
                }
                const length = Number(e.dataTransfer.getData('text/plain'))

                const cell = e.target
                const x =  Number(cell.dataset.x)
                const y = Number(cell.dataset.y)

                const success = onCellDrop(length, x , y)
                if (success && draggedShipEl) {
                    draggedShipEl.remove()
                    draggedShipEl = null
                }
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

    export function renderDock(shipLengths, onRotate) {
        const dockEl = document.createElement('div')
        dockEl.classList.add('dock')
        dockEl.id = 'dock'

        const shipWrapperEl = document.createElement('div')
        shipWrapperEl.classList.add('ship-dock-wrapper-h')
        shipWrapperEl.id = 'ship-dock-wrapper'

        dockEl.append(shipWrapperEl)
        
        shipLengths.forEach(ship => {
            const shipEl = document.createElement('div')
            shipEl.classList.add('ship-in-dock-h')
            shipEl.classList.add('ship-in-dock')
            shipEl.draggable = true
            shipEl.dataset.length = ship
            shipEl.addEventListener('dragstart', (e)=> {
                draggedShipEl = e.currentTarget
                e.dataTransfer.setData('text/plain', e.currentTarget.dataset.length)
            })
            for (let i = 0; i < ship; i++) {
                const unitOfShip = document.createElement('div')
                unitOfShip.classList.add('unit')
                shipEl.append(unitOfShip)
            }
            shipWrapperEl.append(shipEl)
        });
        const btnRotate = document.createElement('button')
        btnRotate.textContent = 'Rotate'
        btnRotate.addEventListener('click', ()=> {
            onRotate()
        })

        dockEl.append(btnRotate)

        return dockEl
    }

    export function clearDock() {
        const dock = document.querySelector('#dock')
        if (dock !== null) {
            dock.remove()
        }
    }

    // render winner div
    export function renderWinner(winnerTextEl, winner) {
        winnerTextEl.textContent =  `${winner} win!!`
    }
    export function clearWinner(winnerTextEl) {   
    winnerTextEl.textContent =  ``
    }
