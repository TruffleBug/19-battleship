// import { Ship } from "./ship";
const Ship = require('./ship.js')



describe.skip('Ship class', () => {
    let newShip;

    beforeEach(() => {
        newShip = new Ship(3, [6, 6]);
    });

    it('should create instance of Ship w/ value/keys', () => {
        expect(newShip.length).toBe(3);
        expect(newShip.coords).toEqual([6,6]);
        expect(newShip).toHaveProperty('length');
        expect(newShip).toHaveProperty('coords');
        expect(newShip).toHaveProperty('hitNum');
        expect(newShip).toHaveProperty('sunk');
    });

    it('should increase hit num to length & sink ship', () => {
        newShip.hit();
        newShip.hit();
        newShip.hit();
        expect(newShip.hitNum).toBe(3);
        expect(newShip.sunk).toBe(true);
    });
})