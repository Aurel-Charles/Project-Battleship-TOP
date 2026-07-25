export class Ship {
    constructor(length, hits = 0, sunk = false) {
        this.length = length
        this.hits = hits
        this.sunk = sunk
    }
    hit() {
        return this.hits++ 
    }
    isSunk() {
        if (this.hits >= this.length){
            return true
        }
        return false
    }
}

class Cell {
    constructor() {
        this.value = null
    }
    getValue(){
        return this.value
    }
    changeValue(newValue){
        this.value = newValue
    }
    resetValue(){
        this.value = null
    }
}

export class Board {
    constructor() {
        this.rows = 10
        this.colums = 10
        this.board = []
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.colums; j++) {
                const cell = new Cell()
                this.board[i].push(cell);
            }
        }
    }
    printBoard(){
        const boardWithValue = this.board.map((line) => line.map(((cell) => cell.getValue())))
        return boardWithValue
    }
    placeShip(shipLength, [coorX, coorY], direction){
        if (this.checkPlace(shipLength, [coorX, coorY], direction) === false) {
            return
        }
        if (direction === 'horizontal') {
            for (let i = 0; i < shipLength; i++) {
                this.board[coorX][coorY+i].changeValue(0)
            }
        }
        if (direction === 'vertical') {
            for (let i = 0; i < shipLength; i++) {
                this.board[coorX+i][coorY].changeValue(0)
            }
        }
    }
    checkPlace(shipLength, [coorX, coorY], direction){
        if (coorX < 0 || coorY < 0) {
            return false
        }
        if (direction === 'horizontal') {
            if (coorY >= this.rows - shipLength) {
                return false
            }
            for (let i = 0; i < shipLength; i++) {
                if(this.board[coorX][coorY+i].getValue() !== null){
                    return false
                }
            }
        }
        if (direction === 'vertical') {
            if (coorX >= this.colums - shipLength) {
                return false
            }
            for (let i = 0; i < shipLength; i++) {
                if(this.board[coorX+i][coorY].getValue() !== null){
                    return false
                }
            }
        }
        return true
    }
    reset(){
        this.board.forEach(line => {
            line.forEach(cell => {
                cell.resetValue()
            });
        });
    }
}






