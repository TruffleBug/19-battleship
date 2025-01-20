import { Player } from "./player";
import { playGame } from ".";

const startGameModal = document.querySelector('.startGameModal');
const enterPlayerNamesModal = document.querySelector('.enterPlayerNamesModal');
const startGameButton = document.querySelector('.startGameModal button');
const cancelButton = document.querySelector('#cancelButton');
const letsGoButton = document.querySelector('#letsGoButton');
let dir = 'horiz';

startGameButton.addEventListener('click', () => {
    startGameModal.close();
    enterPlayerNamesModal.showModal();
});

cancelButton.addEventListener('click', () => {
    enterPlayerNamesModal.close();
    startGameModal.showModal();
});

letsGoButton.addEventListener('click', () => {
    const player1 = new Player(document.querySelector('#player1Name').value);
    const player2 = new Player(document.querySelector('#player2Name').value);
    enterPlayerNamesModal.close();
    playGame();
});