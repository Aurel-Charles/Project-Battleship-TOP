import { Board, Ship } from "./gameEl.js";


describe('Ship Testing', () => {
    let ship, shipB;

    beforeEach(() => {
        ship = new Ship(4);
        shipB = new Ship(1);
    });

    test('ship has correct initial shape', () => {
        expect(ship).toEqual({ length: 4, hits: 0, sunk: false });
    });

    test('hit() increments hits', () => {
        ship.hit();
        ship.hit();
        expect(ship.hits).toEqual(2);
    });

    test('isSunk() is false with no hits', () => {
        expect(ship.isSunk()).toEqual(false);
    });

    test('isSunk() is true once hits reach length', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toEqual(true);
    });

    test('shipB has correct initial shape', () => {
        expect(shipB).toEqual({ length: 1, hits: 0, sunk: false });
    });

    test('shipB hit() increments hits', () => {
        shipB.hit();
        expect(shipB.hits).toEqual(1);
    });

    test('shipB isSunk() is true after one hit', () => {
        shipB.hit();
        expect(shipB.isSunk()).toEqual(true);
    });
});

describe('Board Testing', () => {
    let boardA;

    beforeEach(() => {
        boardA = new Board();
    });

    test('board starts empty', () => {
        boardA.printBoard().forEach(row => {
            expect(row).toEqual(new Array(10).fill(null));
        });
    });

    test('placing a ship horizontally occupies the right cells', () => {
        boardA.placeShip(4, [0, 0], 'horizontal');
        const row = boardA.printBoard()[0];
        row.slice(0, 4).forEach(cell => expect(cell).toBeInstanceOf(Ship));
        row.slice(4).forEach(cell => expect(cell).toBeNull());
    });

    test('checkPlace returns false when ship does not fit vertically', () => {
        expect(boardA.checkPlace(4, [7, 0], 'vertical')).toEqual(false);
    });
});

describe('Board Testing', () => {
    let boardA;

    beforeEach(() => {
        boardA = new Board();
        boardA.placeShip(4, [0, 0], 'horizontal');
    });
    test('rejects fixed axis out of bounds (horizontal)', () => {
        expect(boardA.checkPlace(4, [10, 0], 'horizontal')).toEqual(false)
    })
    test('rejects fixed axis out of bounds (vertical)', () => {
        expect(boardA.checkPlace(4, [0, 10], 'vertical')).toEqual(false)
    })
    test('accepts ship placed exactly at the far edge (horizontal)', () => {
        expect(boardA.checkPlace(4, [0, 6], 'horizontal')).toEqual(true)
    })
    test('rejects ship that overflows by one (horizontal)', () => {
        expect(boardA.checkPlace(4, [0, 7], 'horizontal')).toEqual(false)
    })

    test('check receivAttack() missing a hit', () => {
        expect(boardA.receiveAttack(1, 0)).toEqual('miss');
    });
    test('check receivAttack() invalid a hit', () => {
        boardA.receiveAttack(1, 0)
        expect(boardA.receiveAttack(1, 0)).toEqual('invalid');
    });
    test('check receivAttack() missing a hit get the missed list', () => {
        boardA.receiveAttack(1, 0)
        expect(boardA.missedShots[0]).toEqual([1,0]);
    });
    test('check receivAttack() with a hit', () => {
        expect(boardA.receiveAttack(0, 0)).toEqual('hit');

        const row = boardA.printBoard()[0];
        row.slice(0, 4).forEach(cell => expect(cell).toBeInstanceOf(Ship));
        expect(row[0].hits).toEqual(1);
    });
    test('check number of ship on a board(1)', () => {
        expect(boardA.numberOfShips).toEqual(1);
    });
    test('check number of ship on a board(2)', () => {
        boardA.placeShip(4, [2, 0], 'horizontal');
        expect(boardA.numberOfShips).toEqual(2);
    });
    test('check number of ship sunk on a board(1)', () => {
        boardA.receiveAttack(0, 0)
        boardA.receiveAttack(0, 1)
        boardA.receiveAttack(0, 2)
        boardA.receiveAttack(0, 3)
        expect(boardA.numberOfShipsSunk).toEqual(1);
    });
    test('check number of ship sunk on a board(0)', () => {
        boardA.receiveAttack(0, 0)
        boardA.receiveAttack(0, 1)
        boardA.receiveAttack(0, 2)
        expect(boardA.numberOfShipsSunk).toEqual(0);
    });
});