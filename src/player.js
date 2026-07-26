import { Board } from "./board.js";

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