import { Ship } from "./ship.js"

class Gameboard {
    constructor(player) {
        this.player = player;
        this.myShips = {};
        this.occupied = [];
        this.attacked = [];
    }

    isValidPlacement(length, headCoord, dir = 'horiz') {
        const shipTiles = [];
        let tile;
        for(let i = 0; i < length; i++) {
            if (dir == 'horiz') {
                tile = [headCoord[0] + i, headCoord[1]];
            } else if (dir == 'vert') {
                tile = [headCoord[0], headCoord[1] + i];
            };

            let included = false;
            this.occupied.forEach((space) => {
                if (space[0] == tile[0] && space[1] == tile[1]) {
                    included = true;
                    return false;
                };
            });

            if (included == true) {
                return false;
            } else if (tile[0] > 10 || tile[1] > 10) {
                return false;
            } else {
                shipTiles.push(tile);
            };
        };
        return shipTiles
    }

    placeShip(length, headCoord) {
        const coords = this.isValidPlacement(length, headCoord);
        if(coords == false) {
            return 'Can\'t place ship there!';
        } else {
            this.myShips.newShip = new Ship(length, coords);
            this.occupied.push(coords)
        }
    }


}

const newGameboard = new Gameboard('player2');
newGameboard.placeShip(3, [3, 6]);


export { Gameboard }