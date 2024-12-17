import { Ship } from "./ship";


beforeAll(() => {
    const newShip = new Ship(3, [6,6]);
    return newShip;
});

test('hit once', () => {
    expect(newShip.hit()).toBe(1)
})