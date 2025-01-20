import { Gameboard } from "./gameboard";

class Player {
    constructor(playerName) {
        this.playerName = playerName;
        this.gameboard = new Gameboard(playerName)
    }    
};

export { Player };