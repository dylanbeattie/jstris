import TetrisEngine from '../engine.js';

describe('TetrisEngine initialises properly', () => {
    test('when rows and cols are valid', () => {
        var engine = new TetrisEngine(10, 20);
        expect(engine.rows).toEqual(10);
        expect(engine.cols).toEqual(20);
    });
    test('when rows and cols are not valid', () => {
        var engine = new TetrisEngine("hello", "world");
        expect(engine.rows).toEqual(20);
        expect(engine.cols).toEqual(10);
    });
});