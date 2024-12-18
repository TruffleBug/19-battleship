import { Gameboard } from "./gameboard";



describe('placeShip function', () => {
    const newShip = new Ship(3, [6,6]);

    test('hit once', () => {
        expect(newShip.hit()).toBe('Hit!')
    }) 
})