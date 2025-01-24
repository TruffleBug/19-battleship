<!-- TO RUN:
- 'npm install'
- 'npm run dev'
- open localhost:8080 on browser


TO ADD A LOCAL IMAGE TO JS FILE:
import odinImage from './images/odin.png'

const image = document.createElement('img')
image.src = odinImage

document.body.appendChild(image) -->

----------------------------------------------------------------

<!-- SHIP.JS - Ship class
- Ship object: { length (arg), coords (arg), hitNum = 0, sunk = false }

- hit(shipName) function
    - increment hitNum
    - if isSunk() returns true, return 'You sunk my ship!'
    - else return 'Hit!'

- isSunk() function
    - evaluate if hitNum = length
        - if true, set sunk to true & return true-->



<!-- GAMEBOARD.JS - Gameboard class
- Gameboard object: { player, myShips = {}, attackedByOther = [] } -->

<!-- - isValidPlacement(length, headCoord, dir = 'Horizontal') function
    - const shipTiles = []
    - let tile
    - for while i = 0 & i < length, 
        - if dir = 'Horizontal', const tile = [headCoord[0] + i, headCoord[1]]
        - if dir = 'Vertical', const tile = [headCoord[0], headCoord[1] + i]
        - if either value in tile is > 10, return false
        - run isCoordOnPlacedShip(tile.join())
            - if not-false, return false
        - push tile.join() into shipTiles array
    - return shipTiles array  -->

<!-- - isCoordOnPlacedShip(coord) function
    - let shipNames = array of all keys in myShips
    - for each ship in shipNames, if ship.coords includes coord, return ship
    - else return false -->

<!-- - placeShip(shipName, length, headCoord, dir) function
    - run isValidPlacement(length, headCoord, dir)
        - if true, create new Ship object w/ coords of returned array & add to myShips object
        - if false, return false -->

- receiveAttack(coord, otherPlayer) function
    - if coord.join() is NOT in attackedByOther array, 
        - add coord.join() to attackedByOther array
        - let attackedShip = result of running isCoordOnPlacedShip(coord)
        - if attackedShip is not-false (i.e. if it's a hit),
            - run hit(attackedShip) function on that Ship object
            - alert 'You hit otherPlayerName's attackedShip!'
            - run isGameOver() 
        - else (if it's false)
            - alert 'Miss!'
        - return
    - else (if it is--i.e. already attacked there), return false

<!-- - isGameOver function
    - iterate through all myShips.isSunk, if any == false, return false
    - else, alert 'Game Over!' -->


<!-- PLAYER.JS - Player class
- Player object: { playerName (arg), gameboard = new Gameboard object } -->

----------------------------------------------------------------

<!-- INDEX.JS - game play
- event listeners:
    - startGame modal: 
        - 'Start Game' button
            - close startGame modal
            - show enterPlayerNames modal
    - enterPlayerNames modal: 
        - Cancel button
            - close enterPlayerNamesmodal 
            - open startGame modal
        - 'Let's Go!' button 
            - create new instance of Player for each player 
            - close enterPlayerNames modal
            - run playGame function -->

<!-- ***- display(player) function:
    - querySelect .gameGrid  -->

- playGame function:
    - run renderGameboard(player1)
    - run setShips(player1) 
    
    - let currentPlayer = player1
    - let otherPlayer = player2
    - run updatePlayDirTextForAttack(currentPlayer)
    - let cellIdArray
    - add event listeners to each cell
        - cellIdArray = coordToArray(cell.id)
        - run otherPlayer.gameboard.receiveAttack(cellIdArray)
        - run switchPlayer(otherPlayer)
        - run updatePlayDirTextForAttack(player)

<!-- - renderGameboard(currentPlayer) function:
    - let otherPlayer = Player2
    - if currentPlayer = Player2, otherPlayer = Player1
    - currentPlayerText.textContent = 'playerName's Gameboard ^'
    - for each cell, set bg color = skyBlueColor & textContent = cell.id
    - let shipNames = list of all ships in myShips object (= Object.keys(currentPlayer.gameboard.myShips))
    - for each coord in ship in shipNames,
        - my boat locations: gray bg
    - for each coord in other player's attackedByOther array,
        - my attacks (hit): X
        - my attacks (miss): O
    - for each coord in attackedByOther array,
        - their attacks (hit) = red bg
        - their attacks (miss) = limegreen bg -->

<!-- - setShips(player) function:
    - let otherPlayer = player2, unless it isn't
    - let count = 0
    
    - rotate ship button
        - let dir = 'Horiztonal'
        - create rotateShipButton button w/ event listener: toggle dir, run updatePlayDirTextForSetShips()        
        - replace playDirectionsButton children w/ rotateShipButton you just made
    
    - first playDirectionsText
        - run updatePlayDirTextForSetShips()

    - functionality for click to add ship to grid
        - let cellIdArray
        - for each cell in cells, add event listener: run cellClickForSetShip(player, cell)
    
    - updatePlayDirTextForSetShips() function
        - playDirectionsText.textContent = 'playerName, place your shipName (Length = shipLength, dir)'

    - cellClickForSetShip(player, cell) function
        - cellIdArray = result of running coordToArray(cell.id) 
        - if placeShip(shipName, shipLength, cellIdArray, dir) != false:
            - run renderGameboard(player)
            - count++
            - if shipPiecesp[count] exists, run updatePlayDirTextForSetShips()
        - else: alert 'You can't place your shipName there!'
        - run isCountUp()
        - return

    - isCountUp() function
        - if count = shipPieces.length
            - playDirectionsText.textContent = 'Your ships are all set!'
            - for each cell, remove event listener
            - run switchPlayer(otherPlayer) -- need timeout
            - if player = player1, run setShips(player2) -- need longer timeout -->

<!-- - switchPlayer(switchTo) function
    - switchPlayerModalText.textContent = 'Switch to playerName'
    - show switchPlayerModal -->

<!-- - switchPlayerButton event listener
    - toggle currentPlayer
    - clear playDirections div
    - close switchPlayerModal
    - run renderGameboard(currentPlayer) -->

<!-- - coodToArray(coordInString) function
    - converts '(X,X)' or '[X,X]' to an array [X,X]
    - slice first and last value of coordInString & split w/ ','
    - convert each value in array to number -->


- updatePlayDirTextForAttack(player) function:
    - update playDirectionsText: 'playName, attack!'

----------------------------------------------------------------

<!-- BATTLESHIP.HTML - UI display -->
<!-- - startGame modal:
    - 'Start Game' button -->

<!-- - enterPlayerNames modal:
    - form for Player1 & Player2 names
    - cancel button
    - 'Let's Go!' button -->

<!-- - switchPlayer modal:
    - blacken background screen
    - 'Switch' button -->