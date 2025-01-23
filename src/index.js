import './styles.css';
import { Player } from './player.js';

const grayColor = 'rgb(211, 211, 211)';
const redColor = 'rgb(255, 0, 0)';
const greenColor = 'rgb(50, 205, 50';
const skyBlueColor = 'rgb(135, 206, 235)';

const shipPieces = [
    ['Carrier', 5],
    ['Battleship', 4],
    ['Destroyer', 3],
    ['Submarine', 3],
    ['Patrol Boat', 2]
];

const currentPlayerText = document.querySelector('.currentPlayerText');
const playDirections = document.querySelector('.playDirections');
const playDirectionsText = document.querySelector('.playDirectionsText');
const playDirectionsButton = document.querySelector('.playDirectionsButton');
const cells = document.querySelectorAll('.gameGrid div');
const switchPlayerModal = document.querySelector('.switchPlayerModal');
const switchPlayerModalText = document.querySelector('.switchPlayerModal p');

// THIS WORKS--UNCOMMENTED FOR TESTING EFFICIENCY
// window.onload = () => {
//     document.querySelector('.startGameModal').showModal();
// };

function playGame() {
    renderGameboard(player1);
    // BYPASS SETTING SHIPS EACH TIME FOR DEV
    setShips(player1);

// --------------

    // function setShips2() {
    //     return new Promise((resolve) => {
    //     resolve(setShips(player1))
    //     });
    // }
    
    // async function attack() {
    //     const shipsSet = await setShips2();
    //     console.log(shipsSet); // Output: "Data fetched!"
    //     console.log('await test')
    // }

    // attack();



// function setShips2() {
    //     return new Promise((resolve) => {
    //       resolve(setShips(player1))
    //     });
    // }
      
    // async function attack() {
    //     const shipsSet = await setShips2();
    //     console.log(shipsSet); // Output: "Data fetched!"
    //     console.log('await test')
    // }
    
    // attack();

// ---------------
    
    // let currentPlayer = player1;
    // let otherPlayer = player2;

    // updatePlayDirTextForAttack(currentPlayer);
    // let cellIdArray;

    // cells.forEach(cell => {
    //     cell.addEventListener('click', () => {
    //         cellIdArray = coordToArray(cell.id);
    //         console.log('currentPlayer', currentPlayer);

    //         otherPlayer.gameboard.receiveAttack(cellIdArray);
    //         switchPlayer(otherPlayer);
    //         updatePlayDirTextForAttack(currentPlayer);
    //     });
    // });;
};

function renderGameboard(player) {
    let otherPlayer = player2;
    if (player == player2) otherPlayer = player1;

    currentPlayerText.textContent = `${player.playerName}'s Gameboard ^`;

    cells.forEach(cell => {
        cell.style.backgroundColor = skyBlueColor;
        cell.textContent = cell.id;
    });

    // my boat locations = gray background
    const shipNames = Object.keys(player.gameboard.myShips);
    for(const ship of shipNames) {
        for(const coord of player.gameboard.myShips[ship].coords) {
            document.getElementById(`(${coord})`).style.backgroundColor = grayColor;
        };
    };

    // my attacks (hit) = X
    // my attacks (miss) = O
    for (const coord of otherPlayer.gameboard.attackedByOther) {
        const htmlElement = document.getElementById(`(${coord})`);
        if (otherPlayer.gameboard.isCoordOnPlacedShip(coord) != false) htmlElement.textContent = `X`;
        else {htmlElement.textContent = `O`};
    };

    // their attacks (hit) = red background
    // their attacks (miss) = green background
    for (const coord of player.gameboard.attackedByOther) {
        const htmlElement = document.getElementById(`(${coord})`);
        if (player.gameboard.isCoordOnPlacedShip(coord) != false) htmlElement.style.backgroundColor = redColor;
        else {htmlElement.style.backgroundColor = greenColor};
    };
};

function setShips(player) {
    let otherPlayer = player2;
    if(player == player2) otherPlayer = player1;
    // console.log('current player', player)
    // console.log('other player', otherPlayer)
    let count = 0;

    // ROTATE SHIP BUTTON
    let dir = 'Horizontal';
    console.log('count', count)
    const rotateShipButton = document.createElement('button');
    rotateShipButton.textContent = `Rotate Ship`;
    rotateShipButton.addEventListener('click', () => {
        if(dir == 'Horizontal') dir = 'Vertical';
        else dir = 'Horizontal';
        updatePlayDirTextForSetShips();
        console.log(dir)
    });
    playDirectionsButton.replaceChildren(rotateShipButton);
    
    // FIRST TEXT DIRECTIONS
    updatePlayDirTextForSetShips();

    // CLICK TO ADD SHIP TO GRID
    const areaListener = new AbortController();
    let cellIdArray;
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cellIdArray = coordToArray(cell.id);
            console.log('count', count)
            console.log('player', player)
            // if placement is valid,
            if (player.gameboard.placeShip(shipPieces[count][0], shipPieces[count][1], cellIdArray, dir) != false) {
                renderGameboard(player);
                count++;
                if(shipPieces[count]) {
                    updatePlayDirTextForSetShips();
                };
            } else {
                alert(`You can\'t place your ${shipPieces[count][0]} there!`)
            };
            isCountUp();
            return;        
            }, { signal: areaListener.signal }
        );
    });;

    function updatePlayDirTextForSetShips() {
        playDirectionsText.textContent = `${player.playerName}, place your ${shipPieces[count][0]} (Length = ${shipPieces[count][1]}, ${dir}).`;
    };

    function isCountUp() {
        if(count == shipPieces.length) {
            playDirectionsText.textContent = `Your ships are all set!`;

            cells.forEach(cell => {
                areaListener.abort();
            });
            
            setTimeout(() => {
                switchPlayer(otherPlayer)
            }, 500);

            if(player == player1) {
                setTimeout(() => {
                    setShips(player2);
                }, 2000);
            } else {
                attack(player1);
            };
        };
    };
    // return true;
};

function switchPlayer(switchTo) {
    switchPlayerModalText.textContent = `Switch to ${switchTo.playerName}`;
    switchPlayerModal.showModal();
};

const switchPlayerButton = document.querySelector('.switchPlayerModal button');
switchPlayerButton.addEventListener('click', () => {
    if (currentPlayer == player1) {
        currentPlayer = player2;
        otherPlayer = player1;
    } else {
        currentPlayer = player1;
        otherPlayer = player2;
    };
    // if(currentPlayer == player1) currentPlayer = player2;
    // else {currentPlayer = player1};
    console.log('Switching players... Player = ', currentPlayer.playerName)
    // playDirectionsText.textContent = '';
    switchPlayerModal.close();
    renderGameboard(currentPlayer);
});

function coordToArray(coordInString) {
    let cellIdArray = coordInString.slice(1, -1).split(',');
    cellIdArray = [Number(cellIdArray[0]), Number(cellIdArray[1])];
    return cellIdArray;
};

function attack(currentPlayer) {
    // let currentPlayer = player1;
    let otherPlayer = player2;
    // let otherPlayer;
    // if(currentPlayer == player1) otherPlayer = player2;
    // else{ otherPlayer = player1 };
    
    updatePlayDirTextForAttack(currentPlayer);

    let cellIdArray;
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log('currentPlayer: ', currentPlayer, ', otherPlayer: ', otherPlayer);
            cellIdArray = coordToArray(cell.id);
            
            otherPlayer.gameboard.receiveAttack(cellIdArray);
            // renderGameboard(currentPlayer);
            switchPlayer(otherPlayer);
            updatePlayDirTextForAttack(currentPlayer);
        });
    });;
}


function updatePlayDirTextForAttack(player) {
    playDirectionsText.textContent = `${player.playerName}, attack!`;
};

// ------------------------------------------

const player1 = new Player('Lisa');
const player2 = new Player('Clayton');
let currentPlayer = player1;
let otherPlayer = player2;
// let count;

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

playGame();

export { playGame } 