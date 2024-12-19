// import { Ship } from "./ship.js";
// import { Gameboard } from "./gameboard.js";

const Ship = require('./ship.js')
const Gameboard = require('./gameboard.js')



describe('isValidPlacement function', () => {
    let newGameboard, ship1, ship2;

    beforeEach(() => {
        newGameboard = new Gameboard('player1');
        ship1 = new Ship(3, [[0, 8], [1, 8], [2, 8]]);
        ship2 = new Ship(2, [[3, 5], [3, 6]]);
        newGameboard.myShips.ship1 = ship1;
        newGameboard.myShips.ship2 = ship2;
        newGameboard.occupied = ship1.coords.concat(ship2.coords)
    });

    it('should create instance of Gameboard w/ player', () => {
        expect(newGameboard.player).toBe('player1');
        expect(newGameboard).toHaveProperty('player');
        expect(newGameboard).toHaveProperty('myShips');
        expect(newGameboard).toHaveProperty('attacked');
    });

    it('should give correct coords of horiz ship of length 3', () => {
        expect(newGameboard.isValidPlacement(3, [0, 0])).toEqual([[0, 0], [1, 0], [2, 0]]);
    });

    it('should give correct coords of vert ship of length 3', () => {
        expect(newGameboard.isValidPlacement(3, [0, 0], 'vert')).toEqual([[0, 0], [0, 1], [0, 2]]);
    });

    it('should disallow placement of ship off board', () => {
        expect(newGameboard.isValidPlacement(3, [9, 6])).toBe(false);
    });

    it('should disallow placement of ship on occupied tile', () => {
        expect(newGameboard.isValidPlacement(3, [3, 6])).toBe(false);
    });
});

describe.only('placeShip function', () => {
    let newGameboard;

    beforeEach(() => {
        const newGameboard = new Gameboard('player2');
        newGameboard.placeShip(3, [3, 6]);
    });

    it('should disallow placement of horiz ship', () => {
        expect(newGameboard.placeShip(3, [9, 6])).toBe('Can\'t place ship there!');
    });

    it('should allow placement of vert ship', () => {
        expect(newGameboard.placeShip(3, [9, 2], 'vert')).toBe(undefined);
    });

    // it('should create new ship object & place in myShips array', () => {
    //     expect(newGameboard.placeShip(3, [3, 6])).toBe();
    // });
})