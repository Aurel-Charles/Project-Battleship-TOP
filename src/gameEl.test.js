import { Board, Ship } from "./gameEl.js";

const ship = new Ship(4);
const shipB = new Ship(1);
const boardA = new Board()

describe('Ship Testing', () => {
    test('object Ship', () => {
        expect(ship).toEqual({ length: 4, hits: 0, sunk: false } );
    });
    test('object hit function', () => {
        ship.hit()
        ship.hit()
        expect(ship.hits).toEqual(2);
    });
    test('object isSunk Function', () => {
        expect(ship.isSunk()).toEqual(false);
    });
    test('object isSunk Function', () => {
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toEqual(true);
    });

    test('object ShipB', () => {
        expect(shipB).toEqual({ length: 1, hits: 0, sunk: false } );
    });
    test('object hit function', () => {
        shipB.hit()
        expect(shipB.hits).toEqual(1);
    });
    test('object isSunk Function', () => {
        expect(shipB.isSunk()).toEqual(true);
    });
    test('object isSunk Function', () => {
        shipB.hit()
        shipB.hit()
        expect(shipB.isSunk()).toEqual(true);
    });

});

describe('Board Testing', () => {

    beforeEach(() => {
        boardA.reset()
      });
    
    // Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
    test('Placing ship at coordinates (horizontal)', ()=> {
        boardA.placeShip(4, [0, 0], 'horizontal')
        expect(boardA.printBoard()[0]).toEqual([0, 0, 0, 0, null, null, null, null, null, null])
    })
    test('Placing ship at coordinates (horizontal)', ()=> {

        expect(boardA.printBoard()[0]).toEqual([null, null, null, null, null, null, null, null, null, null])
        expect(boardA.printBoard()[1]).toEqual([null, null, null, null, null, null, null, null, null, null])
        expect(boardA.printBoard()[2]).toEqual([null, null, null, null, null, null, null, null, null, null])
        expect(boardA.printBoard()[3]).toEqual([null, null, null, null, null, null, null, null, null, null])
        expect(boardA.printBoard()[4]).toEqual([null, null, null, null, null, null, null, null, null, null])
        expect(boardA.printBoard()[5]).toEqual([null, null, null, null, null, null, null, null, null, null])
        expect(boardA.printBoard()[6]).toEqual([null, null, null, null, null, null, null, null, null, null])
    })
    
    test('check place ship', ()=> {
        expect(boardA.checkPlace(4, [7, 0], 'vertical')).toEqual(false)

    })

    // test('Placing ship at coordinates (vertical)', ()=> {
    //     boardA.placeShip(4, [0, 9], 'vertical')
    //     expect(boardA.printBoard()[0]).toEqual([null, null, null, null, null, null, null, null, null, 0])
    //     expect(boardA.printBoard()[1]).toEqual([null, null, null, null, null, null, null, null, null, 0])
    //     expect(boardA.printBoard()[2]).toEqual([null, null, null, null, null, null, null, null, null, 0])
    //     expect(boardA.printBoard()[3]).toEqual([null, null, null, null, null, null, null, null, null, 0])

    // })
    // Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
    // Gameboards should keep track of missed attacks so they can display them properly.
    // Gameboards should be able to report whether or not all of their ships have been sunk.



});