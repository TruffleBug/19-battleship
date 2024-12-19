// pieces: 
    // Carrier (5),
    // Battleship (4),
    // Destroyer (3), 
    // Submarine (3), 
    // Patrol Boat (2)

class Ship {
    constructor(length, coords) {
        this.length = length;
        this.coords = coords;
        this.hitNum = 0;
        this.sunk = false
    }

    hit() {
        this.hitNum += 1;
        this.isSunk();
        return 'Hit!';
    }

    isSunk() {
        if(this.hitNum == this.length) {
            this.sunk = true;
            return 'You sunk my ship!'
        } else {
            return
        }
    }
}



export { Ship }