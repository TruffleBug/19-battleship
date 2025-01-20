<!-- TO RUN:
- 'npm install'
- 'npm run dev'
- open localhost:8080 on browser


TO ADD A LOCAL IMAGE TO JS FILE:
import odinImage from './images/odin.png'

const image = document.createElement('img')
image.src = odinImage

document.body.appendChild(image) -->

-------------------------------------------

<!-- SHIP.JS - Ship class
- Ship object: { length (arg), coords (arg), hitNum = 0, sunk = false }

- hit function
    - increment hitNum
    - if isSunk function returns true, return 'You sunk my ship!'
    - else return 'Hit!'

- isSunk function
    - evaluate if hitNum = length
        - if true, set sunk to true & return true-->



<!-- GAMEBOARD.JS - Gameboard class
- Gameboard object: { player, myShips = {}, attackedByOther = [] } -->

<!-- - isValidPlacement function (args: length, headCoord, dir = horiz)
    - const shipTiles = []
    - let tile
    - for while i = 0 & i < length, 
        - if dir = horiz, const tile = [headCoord[0] + i, headCoord[1]]
        - if dir = vert, const tile = [headCoord[0], headCoord[1] + i]
        - if either value in tile is > 10, return false
        - run isCoordOnPlacedShip with argument = tile
            - if not-false, return false
        - push tile (joined into a string) into shipTiles array
    - return shipTiles array  -->

<!-- - isCoordOnPlacedShip function (arg: coord)
    - let shipNames = array of all keys in myShips
    - for each ship in shipNames, if ship.coords includes coord, return ship
    - else return false -->

<!-- - placeShip function (args: shipName, length, headCoord, dir)
    - run isValidPlacement function
        - if true, 
            - create new Ship object w/ coords of returned array & add to myShips object
        - if false, return 'Can't place shipName there!' -->

<!-- - receiveAttack function (arg: coord)
    - determine if coord is valid (must be within 10x10 square and not in attackedByOther array)
        - if true,
            - add coord(joined into string) to attackedByOther array
            - if isCoordOnPlacedShip returns not-false,
                - run hit function on that Ship object
                - run isGameOver function 
        - if false, return 'You've already attacked there!' -->

<!-- - isGameOver function
    - iterate through all myShips.isSunk, if any == false, return false
    - else, alert 'Game Over!' -->



<!-- PLAYER.JS - Player class
- Player object: { type (arg), playerName (arg) gameboard = new Gameboard object } -->



INDEX.JS - game play
<!-- - event listeners:
    - startGame modal: 
        - 'Start Game' button (onClick)
            - close startGame modal
            - show enterPlayerNames modal
    - enterPlayerNames modal: 
        - Cancel button (onClick)
            - close enterPlayerNamesmodal 
            - open startGame modal
        - 'Let's Go!' button (onClick) 
            - create new instance of Player for each player 
            - close enterPlayerNames modal
            - run playGame function -->

<!-- ***- display(player) function:
    - querySelect .gameGrid  -->

- playGame function:
    - run setShips(player1) function

- setShips function (arg: player):
    - playDirections div content:
        <!-- - "Rotate Ship" button
            - addEventListener (onClick): toggle dir = 'horiz' & 'vert' -->
        - "click on gameboard to place your shipName"
        - "shipName: length = length, direction = dir"
    <!-- - let count = 0 -->
    - set up event listener for gameboard cell (onClick each cell):
        - run player.gameboard.placeShip(shipPieces[count][0], shipPieces[count][1], headCoord(onClick), dir) function
        - count++
        - run renderGameboard(player) function
    - if (count > shipPieces.length && player == player1), run setShips(player2) function
    - if (count > shipPieces.length && player == player2), clear playDirections div content & break

<!-- - coodToArray(arg: coordInString)
    - converts '(X,X)' or '[X,X]' to an array [X,X] -->

<!-- - renderGameboard(currentPlayer) function:
    - let otherPlayer = Player2
    - if currentPlayer = Player2, otherPlayer = Player1

    - let shipNames = list of all ships in myShips object (= Object.keys(currentPlayer.gameboard.myShips))
    - for each ship in shipNames,
        - my boat locations: gray background
    - for each coord in attackedByOther array,
        - their attacks (hit) = red background
        - their attacks (miss) = limegreen background
    - for each coord in other player's attackedByOther array,
        - my attacks (hit): X
        - my attacks (miss): O
    - **USE EXISTING ISCOORDONPLACEDSHIP FUNCTION ON GAMEBOARD TO DETERMINE IF HIT -->

----------------------------------------------------------------

BATTLESHIP.HTML - UI display
<!-- - startGame modal:
    - 'Start Game' button -->

<!-- - enterPlayerNames modal:
    - form for Player1 & Player2 names
    - cancel button
    - 'Let's Go!' button -->