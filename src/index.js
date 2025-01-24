import './styles.css';
import { Player } from "./player";
// import { playGame } from ".";
// import { startGameButton, letsGoButton, cancelButton } from './eventListeners';

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
const playDirectionsText = document.querySelector('.playDirectionsText');
const playDirectionsButton = document.querySelector('.playDirectionsButton');
const cells = document.querySelectorAll('.gameGrid div');
const switchPlayerModal = document.querySelector('.switchPlayerModal');
const switchPlayerModalText = document.querySelector('.switchPlayerModal p');
const startGameModal = document.querySelector('.startGameModal');
const startGameButton = document.querySelector('.startGameModal button');
const enterPlayerNamesModal = document.querySelector('.enterPlayerNamesModal');
const letsGoButton = document.querySelector('#letsGoButton');
const cancelButton = document.querySelector('#cancelButton');

let player1, player2, currentPlayer, otherPlayer;

startGameButton.addEventListener('click', () => {
    startGameModal.close();
    enterPlayerNamesModal.showModal();
});

letsGoButton.addEventListener('click', () => {
    player1 = new Player(document.querySelector('#player1Name').value);
    player2 = new Player(document.querySelector('#player2Name').value);
    currentPlayer = player1;
    otherPlayer = player2;
    enterPlayerNamesModal.close();
    playGame();
});

cancelButton.addEventListener('click', () => {
    enterPlayerNamesModal.close();
    startGameModal.showModal();
});

window.onload = () => {
    document.querySelector('.startGameModal').showModal();
};

function playGame() {
    renderGameboard(player1);
    setShips(player1);
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
                switchPlayer()
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
};

function switchPlayer() {
    switchPlayerModalText.textContent = `Switch to ${otherPlayer.playerName}`;
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
    console.log('Switching players... Player = ', currentPlayer.playerName)
    // playDirectionsText.textContent = '';
    switchPlayerModal.close();
    updatePlayDirTextForAttack(currentPlayer);
    renderGameboard(currentPlayer);
});

function coordToArray(coordInString) {
    let cellIdArray = coordInString.slice(1, -1).split(',');
    cellIdArray = [Number(cellIdArray[0]), Number(cellIdArray[1])];
    return cellIdArray;
};

function attack(player) {   
    updatePlayDirTextForAttack(player);

    let cellIdArray;
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log('player: ', currentPlayer, ', \notherPlayer: ', otherPlayer);
            cellIdArray = coordToArray(cell.id);
            
            otherPlayer.gameboard.receiveAttack(cellIdArray, currentPlayer, otherPlayer);
            renderGameboard(currentPlayer);
            switchPlayer();
        });
    });;
};

function updatePlayDirTextForAttack(currentPlayer) {
    playDirectionsText.textContent = `${currentPlayer.playerName}, attack!`;
};

export { playGame } 