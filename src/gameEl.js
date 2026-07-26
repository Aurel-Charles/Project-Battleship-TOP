export class Ship {
    constructor(length) {
        this.length = length
        this.hits = 0
        this.sunk = false
    }
    hit() {
        this.hits++ 
        return this.hits
    }
    isSunk() {
        if (this.hits >= this.length){
            this.sunk = true
            return true
        }
        return this.sunk
    }
}


class Cell {
    constructor() {
        this.value = null
        this.hit = false
    }
    getValue(){
        return this.value
    }
    changeValue(newValue){
        this.value = newValue
    }
    isHit(){
        return this.hit
    }
    markHit(){
        this.hit = true
    }
    resetValue(){
        this.value = null
        this.hit = false
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
        this.missedShots = []
        this.numberOfShips = 0
        this.numberOfShipsSunk = 0
        this.allShipSunk = false 
    }
    printBoard(){
        const boardWithValue = this.board.map((line) => line.map(((cell) => cell.getValue())))
        return boardWithValue
    }
    placeShip(shipLength, [coorX, coorY], direction){
        if (this.checkPlace(shipLength, [coorX, coorY], direction) === false) {
            return false
        }
        const ship = new Ship(shipLength)
        if (direction === 'horizontal') {
            for (let i = 0; i < shipLength; i++) {
                this.board[coorX][coorY+i].changeValue(ship)
            }
        }
        if (direction === 'vertical') {
            for (let i = 0; i < shipLength; i++) {
                this.board[coorX+i][coorY].changeValue(ship)
            }
        }
        this.numberOfShips++
        return true
    }
    checkPlace(shipLength, [coorX, coorY], direction){
        if (coorX < 0 || coorY < 0) {
            return false
        }
        if (direction === 'horizontal') {
            if (coorY > this.colums - shipLength) {
                return false
            }
            if (coorX >= this.rows) {
                return false
            }
            for (let i = 0; i < shipLength; i++) {
                if(this.board[coorX][coorY+i].getValue() !== null){
                    return false
                }
            }
        }
        if (direction === 'vertical') {
            if (coorX > this.rows - shipLength) {
                return false
            }
            if (coorY >= this.colums ) {
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
    receiveAttack(coorX, coorY){
        const cell = this.board[coorX][coorY]
        if (cell.isHit()) {
            return 'invalid'
        }
        cell.markHit()
        const ship = cell.getValue()

        if (ship === null) {
            this.missedShots.push([coorX,coorY])
            return 'miss'
        }

        ship.hit();
        if(ship.isSunk()){
            this.numberOfShipsSunk++
            if (this.numberOfShips === this.numberOfShipsSunk) {
                this.allShipSunk = true
            }
            return 'sunk'
        }
        return 'hit'
    }
    reset(){
        this.board.forEach(line => {
            line.forEach(cell => {
                cell.resetValue()
            });
        });
        this.missedShots = []
        this.numberOfShips = 0
        this.numberOfShipsSunk = 0
        this.allShipSunk = false    
    }
}



export class Player {
    constructor(name, isComputer = false) {
        this.name = name 
        this.isComputer = isComputer
        this.board = new Board()
    }

    randomPlaceShip(allShipLengths){
        allShipLengths.forEach(length => {            
            let placed = false
            while (placed !== true) {
                let coorX = Math.floor(Math.random() * this.board.rows)
                let coorY = Math.floor(Math.random() * this.board.colums)
                let direction = 'vertical'
                if (Math.random() > 0.5) {
                    direction = 'horizontal'
                }
                placed = this.board.placeShip(length,[coorX, coorY], direction)   
            }
        });
    }

    attack(opponentBoard, coorX, coorY){
        return opponentBoard.receiveAttack(coorX,coorY)
    }

    randomAttack(opponentBoard){
        let coorX
        let coorY
        let result
        do {
            coorX = Math.floor(Math.random() * opponentBoard.rows)
            coorY = Math.floor(Math.random() * opponentBoard.colums)
            result = opponentBoard.receiveAttack(coorX,coorY)
        } while ( result === 'invalid' );
        return {coorX, coorY , result}
    }
}




