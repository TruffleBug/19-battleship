import { Ship } from "./ship.js"

// 10x10
class Gameboard {
    constructor(player) {
        this.player = player;
        this.myShips = {};
        this.attacked = [];
    }

    placeShip(length, coord) {
        const newShip = new Ship(length, coord);
        this.myShips.push(coord)
    }

    receiveAttack(coord) {

    }
}



export { Gameboard }