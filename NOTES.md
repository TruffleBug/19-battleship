<!-- TO RUN:
- 'npm install'
- 'npm run dev'
- open localhost:8080 on browser


TO ADD A LOCAL IMAGE TO JS FILE:
import odinImage from './images/odin.png'

const image = document.createElement('img')
image.src = odinImage

document.body.appendChild(image) -->



SHIP.JS - Ship class
- Ship object: { length (input), coord (input), hitNum = 0, isSunk = false }

- hit function
    - increment hitNum
    - console.log 'Hit!'
    - return

- isSunk function
    - evaluate if hitNum = length
        - if true, set isSunk to true & return 'You sunk my ship!'
        - if false, return



GAMEBOARD.JS - Gameboard class
- Gameboard object: { myShips = {}, attacked = [] }

- placeShip function (inputs: length, coord)
    - run isValidPlacement function
        - if true, create new Ship object at returned array & add to myShips
        - if false, return 'Cannot place ship at that location'

- isValidPlacement function (inputs: length, coord, dir = horiz)
    - const shipTiles = [];
    - for while i <= length, 
        - if dir = horiz, tile = (coord[0] + i, coord[1])
        - if dir = vert, tile = (coord[0], coord[1] + i)
        - if tile[0] > 10 or tile[1] > 10, return false
        - if tile is in attacked array, return false
        - else push tile into shipTiles array & return shipTiles array

- receiveAttack function (input: coord)
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
    - determine if all myShips.isSunk = true
        - if true, alert 'Game Over - You Lose'



PLAYER.JS - Player class
- Player object: { type (input), gameboard = new Gameboard object }