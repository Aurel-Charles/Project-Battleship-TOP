import { Player } from "./player.js";

export class Game {
  constructor(playerOneName, playerTwoName, shipsByLength, vsHuman = false) {
    this.playerOne = new Player(playerOneName);
    if (vsHuman) {
      this.playerTwo = new Player(playerTwoName);
    } else {
      this.playerTwo = new Player(playerTwoName, true);
    }
    this.shipsByLength = shipsByLength;
    this.currentPlayer = this.playerOne;
  }

  placeShipByplayer(player, shipLength, coorX, coorY, direction) {
    // check if its a computer
    if (player.isComputer) {
      return player.randomPlaceShip(this.shipsByLength);
    }
    return player.board.placeShip(shipLength, [coorX, coorY], direction);
  }
}
