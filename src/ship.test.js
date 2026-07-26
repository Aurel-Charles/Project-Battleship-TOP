import { Ship } from "./ship.js";

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