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

    test('check receivAttack() missing a hit', () => {
        expect(boardA.receiveAttack(1, 0)).toEqual(false);
    });
    test('check receivAttack() missing a hit get the missed list', () => {
        boardA.receiveAttack(1, 0)
        expect(boardA.missedShots[0]).toEqual([1,0]);
    });
    test('check receivAttack() with a hit', () => {
        expect(boardA.receiveAttack(0, 0)).toEqual(true);

        const row = boardA.printBoard()[0];
        row.slice(0, 4).forEach(cell => expect(cell).toBeInstanceOf(Ship));
        expect(row[0].hits).toEqual(1);
    });
});