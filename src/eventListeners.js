// import { Player } from "./player";
// import { playGame } from ".";

// const startGameModal = document.querySelector('.startGameModal');
// const startGameButton = document.querySelector('.startGameModal button');
// const enterPlayerNamesModal = document.querySelector('.enterPlayerNamesModal');
// const letsGoButton = document.querySelector('#letsGoButton');
// const cancelButton = document.querySelector('#cancelButton');

// startGameButton.addEventListener('click', () => {
//     startGameModal.close();
//     enterPlayerNamesModal.showModal();
// });

// letsGoButton.addEventListener('click', () => {
//     const player1 = new Player(document.querySelector('#player1Name').value);
//     const player2 = new Player(document.querySelector('#player2Name').value);
//     let currentPlayer = player1;
//     let otherPlayer = player2;
//     enterPlayerNamesModal.close();
//     playGame();
// });

// cancelButton.addEventListener('click', () => {
//     enterPlayerNamesModal.close();
//     startGameModal.showModal();
// });

// export { startGameButton, letsGoButton, cancelButton }