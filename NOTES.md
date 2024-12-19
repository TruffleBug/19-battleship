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
    - run isSunk function
    - return 'Hit!'

- isSunk function
    - evaluate if hitNum = length
        - if true, set sunk to true & return 'You sunk my ship!'
        - if false, return -->



GAMEBOARD.JS - Gameboard class
- Gameboard object: { player, myShips = {}, occupied = [], attacked = [] }

<!-- - isValidPlacement function (args: length, headCoord, dir = horiz)
    - const shipTiles = []
    - let tile
    - for while i = 0 & i <= length, 
        - if dir = horiz, const tile = [headCoord[0] + i, headCoord[1]]
        - if dir = vert, const tile = [headCoord[0], headCoord[1] + i]
        - let included = false
            - for each element in gameboard.occupied, if space[0] = tile[0] & space[1] = tile[1], included = true
                - else return false
        - if included = false, return false
        - if tile[0] > 10 or tile[1] > 10, return false
        - else, push tile into shipTiles array
    - return shipTiles array -->

- placeShip function (args: length, headCoord)
    - run isValidPlacement function
        - if true, 
            - create new Ship object w/ coords of returned array & add to myShips
            - push coords into occupied array
        - if false, return 'Can't place ship there!'

- receiveAttack function (arg: coord)
    - determine if coord is valid
        - must be within 10x10 square and not in attacked array
        - if true,
            - add coord to attacked array
            - determine if coord is within myShips coords
                - if true, 
                    - run hit function on Ship object
                    - run isSunk function on Ship object
                    - run isGameOver function 
        - if false, return 'You've already attacked there!'

- isGameOver function
    - determine if all myShips.sunk = true
        - if true, alert 'Game Over - You Lose'



PLAYER.JS - Player class
- Player object: { type (arg), gameboard = new Gameboard object }