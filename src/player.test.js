import { Player } from "./player.js";

describe('Player Testing', () => {
    let playerA;
    let playerB;


    beforeEach(() => {
        playerA = new Player();
        playerB = new Player();
    });



    test('check N number of ship on the board', () => {
        const ships = [5, 3, 3, 2, 1]
        playerA.randomPlaceShip(ships)
        expect(playerA.board.numberOfShips).toEqual(5);
    });
    
    test('check a miss with attack(opponentBoard, coorX, coorY)', () => {
        playerA.board.placeShip(5, [0,0], 'vertical')
        expect(playerB.attack(playerA.board, 0, 1)).toEqual('miss');
        expect(playerB.attack(playerA.board, 0, 0)).toEqual('hit');
    });

    test('randomAttack tombe sur une case prévisible quand Math.random est mocké', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0)
        playerA.board.placeShip(5, [0, 0], 'horizontal')
        const shot = playerB.randomAttack(playerA.board)

        expect(shot).toEqual({ coorX: 0, coorY: 0, result: 'hit' })
        
        jest.restoreAllMocks()
    })
});