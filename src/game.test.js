import { Game } from "./game.js";
import { Ship } from "./gameEl.js";

describe('Game Testing', () => {
    let game;

    beforeEach(() => {
        game = new Game('Aurel', 'Computer', [5,3,3,2,1]);
    });

    test('Game starts with shipsByLength in a array', () => {
        expect(game.shipsByLength).toEqual([5,3,3,2,1]);
    });
    test('human player to be human', () => {
        expect(game.playerOne.isComputer).toEqual(false);
    });
    test('Computer player to be computer', () => {
        expect(game.playerTwo.isComputer).toEqual(true);
    });
    test('Current player to be playerOne ', () => {
        expect(game.currentPlayer).toBe(game.playerOne);
    });

});
describe('Game Testing - Placement ships', () => {
    let game;

    beforeEach(() => {
        game = new Game('Aurel', 'Computer', [5,3,3,2,1]);
    });

    test('Place all computer ships', () => {
        game.placeShipByplayer(game.playerTwo)
        expect(game.playerTwo.board.numberOfShips).toEqual(5);
    });
    test('Place a ship on human board', () => {
        game.placeShipByplayer(game.playerOne, game.shipsByLength[0], 0, 0, 'vertical')
        const result =  game.playerOne.board.printBoard()
        expect(result[0][0]).toBeInstanceOf(Ship);
    });

});
