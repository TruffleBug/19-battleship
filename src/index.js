// import './styles.css';
import { Ship } from './ship.js';
import { Gameboard } from './gameboard.js';

// pieces: 
    // Carrier (5),
    // Battleship (4),
    // Destroyer (3), 
    // Submarine (3), 
    // Patrol Boat (2)

const player1Gameboard = new Gameboard('player1');
// player1Gameboard.placeShip('battleship', 4, [3,6]);
// player1Gameboard.placeShip('carrier', 5, [2,2], 'vert');
player1Gameboard.placeShip('destroyer', 3, [10,1], 'vert');
// player1Gameboard.placeShip('patrol boat', 2, [2,2]); // should err
player1Gameboard.placeShip('patrol boat', 2, [8,5]);
console.log('pre attack', player1Gameboard)

player1Gameboard.receiveAttack([3,3]);
player1Gameboard.receiveAttack([5,3]);
player1Gameboard.receiveAttack([8,3]);
player1Gameboard.receiveAttack([3,3]); // should err
player1Gameboard.receiveAttack([8,5]); // should hit patrol boat
player1Gameboard.receiveAttack([9,5]); // should sink patrol boat
player1Gameboard.receiveAttack([10,1]); // should hit destroyer
player1Gameboard.receiveAttack([10,2]); // should hit destroyer
player1Gameboard.receiveAttack([10,3]); // should sink destroyer




// console.log('attackedByOther', player1Gameboard.attackedByOther)
console.log('post attack', player1Gameboard)