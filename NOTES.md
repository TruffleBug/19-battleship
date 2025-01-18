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



PLAYER.JS - Player class
- Player object: { type (arg), gameboard = new Gameboard object }