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

    hit(shipName) {
        this.hitNum += 1; 
        if (this.isSunk() == true) return console.log(`You sunk my ${shipName}!`);
        return console.log('Hit!');
    }

    isSunk() {
        if(this.hitNum == this.length) {
            this.sunk = true;
            return true;
        };
    }
};


export { Ship }