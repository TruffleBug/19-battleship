import { Ship } from "./ship.js"

class Gameboard {
    constructor() {
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
        } else {
            this.myShips[shipName] = new Ship(length, shipTiles);
        };
    }

    receiveAttack(coord, currentPlayer, otherPlayer) {
        if(!this.attackedByOther.includes(coord.join())) {
            this.attackedByOther.push(coord.join());

            const attackedShip = this.isCoordOnPlacedShip(coord.join());
            if(attackedShip != false) {
                this.myShips[attackedShip].hit(attackedShip);
                if(otherPlayer.gameboard.myShips[attackedShip].sunk == true) {
                    alert(`You sunk ${otherPlayer.playerName}'s ${attackedShip}`);
                } else {
                    alert(`You hit ${otherPlayer.playerName}'s ${attackedShip}!`);
                };
                this.isGameOver(currentPlayer);
                return;
            } else {
                alert('Miss!');
            }
            return;
        } else { // already attacked there
            return false;
        };
    }

    isGameOver(currentPlayer) {
        let shipNames = Object.keys(this.myShips);
        for(const ship of shipNames) {
            if (this.myShips[ship].sunk == false) {
                return false;
            };
        };
        setTimeout(() => {
            alert(`Game over! ${currentPlayer.playerName} wins!`);
            location.reload();   
        }, 500);
    }
};

export { Gameboard }