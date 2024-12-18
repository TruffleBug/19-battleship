import { Ship } from "./ship";



describe.only('Ship class', () => {
    const newShip = new Ship(3, [6, 6]);

    test('hit once', () => {
        expect(newShip.hit()).toBe('Hit!')
    }) 
})