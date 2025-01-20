import './styles.css';
import { Player } from './player.js';

const grayColor = 'rgb(211, 211, 211)';
const redColor = 'rgb(255, 0, 0)';
const greenColor = 'rgb(50, 205, 50';

const shipPieces = [
    ['Carrier', 5],
    ['Battleship', 4],
    ['Destroyer', 3],
    ['Submarine', 3],
    ['Patrol Boat', 2]
];

const currentPlayerText = document.querySelector('.currentPlayerText');
const playDirections = document.querySelector('.playDirections');
const cells = document.querySelectorAll('.gameGrid div');

// THIS WORKS--UNCOMMENTED FOR TESTING EFFICIENCY
// window.onload = () => {
//     document.querySelector('.startGameModal').showModal();
// };

function playGame() {
    setShips(player1);
    // renderGameBoard(player1);
};

function renderGameBoard(player) {
    let otherPlayer = player2;
    if (player == player2) otherPlayer = player1;

    currentPlayerText.textContent = `${player.playerName}'s Gameboard ^`

    // my boat locations = gray background
    const shipNames = Object.keys(player.gameboard.myShips);
    for(const ship of shipNames) {
        for(const coord of player.gameboard.myShips[ship].coords) {
            document.getElementById(`(${coord})`).style.backgroundColor = grayColor;
        };
    };

    // my attacks (hit) = X
    // my attacks (miss) = O
    // for (const coord of otherPlayer.gameboard.attackedByOther) {
    //     const htmlElement = document.getElementById(`(${coord})`);

    //     if (otherPlayer.gameboard.isCoordOnPlacedShip(coord) != false) {
    //         htmlElement.textContent = `X`;
    //     } else {
    //         htmlElement.textContent = `O`;
    //     };
    // };

    // their attacks (hit) = red background
    // their attacks (miss) = green background
    // for (const coord of player.gameboard.attackedByOther) {
    //     const htmlElement = document.getElementById(`(${coord})`);

    //     if (player.gameboard.isCoordOnPlacedShip(coord) != false) {
    //         htmlElement.style.backgroundColor = redColor;
    //     } else {            
    //         htmlElement.style.backgroundColor = greenColor;
    //     };
    // };
};

function setShips(player) {
    renderGameBoard(player);
    let dir = 'Horizontal';
    let count = 0;
    const rotateShipButton = document.createElement('button');
    const setShipText = document.createElement('p');
    rotateShipButton.textContent = `Rotate Ship`;
    rotateShipButton.addEventListener('click', () => {
        if(dir == 'Horizontal') dir = 'Vertical';
        else dir = 'Horizontal';
        setShipText.textContent = `${player.playerName}, place your ${shipPieces[count][0]} (Length = ${shipPieces[count][1]}, ${dir}).`;
        console.log(dir)
    });
    playDirections.appendChild(rotateShipButton);
    
    setShipText.textContent = `${player.playerName}, place your ${shipPieces[count][0]} (Length = ${shipPieces[count][1]}, ${dir}).`;
    playDirections.appendChild(setShipText);

    // if (count < shipPieces.length) {
    //     cells.forEach(cell => {
    //         cell.addEventListener('click', () => {
    //             const cellIdArray = coordToArray(cell.id);
                
    //             if(player.gameboard.placeShip(shipPieces[count][0], shipPieces[count][1], cellIdArray, dir) != false) {
    //                 renderGameBoard(player);
    //                 count++;
    //                 console.log('count', count)
    //                 if(shipPieces[count]) {
    //                     setShipText.textContent = `${player.playerName}, place your ${shipPieces[count][0]} (Length = ${shipPieces[count][1]}, ${dir}).`;
    //                 };
    //             } else {
    //                 alert(`You can\'t place your ${shipPieces[count][0]} there!`)
    //             }
    //             // player.gameboard.placeShip(shipPieces[count][0], shipPieces[count][1], cellIdArray, dir);
    //             // if (count > shipPieces.length && player == player2) {
    //                 //     playDirections.textContent = '';
    //                 //     break;
    //                 // }
    //         });
    //     });
    // } 

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellIdArray = coordToArray(cell.id);
            
            if(count < shipPieces.length) {
                if (player.gameboard.placeShip(shipPieces[count][0], shipPieces[count][1], cellIdArray, dir) != false) {
                    renderGameBoard(player);
                    count++;
                    if(shipPieces[count]) {
                        setShipText.textContent = `${player.playerName}, place your ${shipPieces[count][0]} (Length = ${shipPieces[count][1]}, ${dir}).`;
                    };
                    if(count == shipPieces.length) {
                        setShipText.textContent = `All your ships are set!`;
                        setTimeout(() => {
                            alert(`All done! Switch to ${player2.playerName}`)
                        }, 500);
                    }
                } else {
                    alert(`You can\'t place your ${shipPieces[count][0]} there!`)
                };
            };
        });
    });

};

function coordToArray(coordInString) {
    let cellIdArray = coordInString.slice(1, -1).split(',');
    cellIdArray = [Number(cellIdArray[0]), Number(cellIdArray[1])];
    return cellIdArray;
};

// ------------------------------------------

const player1 = new Player('Lisa');
const player2 = new Player('Clayton');

// player1.gameboard.placeShip('destroyer', 3, [10,1], 'Vertical');
// player1.gameboard.placeShip('patrol boat', 2, [8,5]);
// player2.gameboard.placeShip('destroyer', 3, [6,8]);
// player2.gameboard.placeShip('patrol boat', 2, [2,1], 'Vertical');

// console.log('pre attack-player1 gameboard', player1.gameboard)
// console.log('pre attack-player2 gameboard', player2.gameboard)

// player1.gameboard.receiveAttack([3,3]);
// player1.gameboard.receiveAttack([5,3]);
// player1.gameboard.receiveAttack([3,3]); // should err
// player1.gameboard.receiveAttack([8,5]); // should hit patrol boat
// player1.gameboard.receiveAttack([9,5]); // should sink patrol boat
// player1.gameboard.receiveAttack([10,1]); // should hit destroyer
// player1.gameboard.receiveAttack([10,2]); // should hit destroyer
// player1.gameboard.receiveAttack([10,3]); // should sink destroyer

// player2.gameboard.receiveAttack([2,2]);
// player2.gameboard.receiveAttack([5,5])

// console.log('attackedByOther', player1.gameboard.attackedByOther)
// console.log('post attack', player1.gameboard)

playGame();

export { playGame } 