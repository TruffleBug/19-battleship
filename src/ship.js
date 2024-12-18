// pieces: 
    // Carrier (5),
    // Battleship (4),
    // Destroyer (3), 
    // Submarine (3), 
    // Patrol Boat (2)

class Ship {
    constructor(length, coord) {
        this.length = length;
        this.hitNum = 0;
        this.isSunk = false;
        this.coord = coord
    }

    hit() {
        this.hitNum += 1;
        if(this.isSunk == true) return 'You sunk my ship!';
        return 'Hit!';
    }

    isSunk() {
        if(this.hitNum == this.length) {
            this.isSunk = true;
            return true
        }
    }
}



export { Ship }