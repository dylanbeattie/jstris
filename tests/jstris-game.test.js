import Game from '../js/game.js';

describe('Game engine initialises', () => {
    test('with default rows and cols ', () => {
        let game = new Game();
        expect(game.cols).toBe(10);
        expect(game.rows).toBe(20);
    });
    test('with specified rows and cols ', () => {
        let game = new Game(20,30);
        expect(game.rows).toBe(20);
        expect(game.cols).toBe(30);
    });
});