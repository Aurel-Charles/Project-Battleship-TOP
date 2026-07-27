import { Cell } from "./cell.js";
import { Ship } from "./ship.js";

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
    getCellState(){
        const boardWithValue = this.board.map((line) => line.map(((cell) => {
            let hasShip = cell.getValue()===null? false : true
            let isHit = cell.isHit()
            return {hasShip, isHit}
        })))
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