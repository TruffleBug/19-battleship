import { Ship } from "./ship.js"

class Gameboard {
    constructor(playerName) {
        this.playerName = playerName;
        this.myShips = {};
        this.attackedByOther = []; // array of strings
    }

    isValidPlacement(length, headCoord, dir = 'Horizontal') {
        const shipTiles = [];
        let tile;
        for(let i = 0; i < length; i++) {
            if (dir == 'Horizontal') {
                tile = [headCoord[0] + i, headCoord[1]];
            } else {
                tile = [headCoord[0], headCoord[1] + i];
            };

            if (tile[0] > 10 || tile[1] > 10) return false;
            if (this.isCoordOnPlacedShip(tile.join()) != false) return false;

            shipTiles.push(tile.join())
        };
        return shipTiles // array of strings
    }

    isCoordOnPlacedShip(coord) { // coord should be an array: [X,X]
        let shipNames = Object.keys(this.myShips);
        // if(typeof coord == 'object') coord.join()
        for(const ship of shipNames) {
            if (this.myShips[ship].coords.includes(coord)) {
                return ship;
            };
        };
        return false;
    }

    placeShip(shipName, length, headCoord, dir) {
        const shipTiles = this.isValidPlacement(length, headCoord, dir);
        if(shipTiles == false) {
            return false;
            // return console.log(`You can\'t place ${shipName} there!`);
        } else {
            this.myShips[shipName] = new Ship(length, shipTiles);
        };
    }

    receiveAttack(coord) {
        // CAN PROBABLY DELETE COORD CONDITIONALS BELOW WHEN UI IS MADE
        if(coord[0] >= 1 && coord[0] <= 10 && coord[1] >= 0 && coord[1] <= 10 && !this.attackedByOther.includes(coord.join())) {
            this.attackedByOther.push(coord.join());

            const attackedShip = this.isCoordOnPlacedShip(coord);
            if(attackedShip != false) {
                this.myShips[attackedShip].hit(attackedShip);
                this.isGameOver();
            };
        } else {
            return console.log('You already attacked there!');
        };
    }

    isGameOver() {
        let shipNames = Object.keys(this.myShips);
        for(const ship of shipNames) {
            if (this.myShips[ship].sunk == false) {
                return false;
            };
        };
        return console.log('Game over!');
    }
};

export { Gameboard }