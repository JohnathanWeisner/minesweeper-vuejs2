const Board = require('./Board.js')
const EventSystem = require('./EventSystem.js')
const START = 'start';
const BOUNDS_ERROR = 'bounds_error';
const GAME_OVER = 'game_over';
const GAME_WON = 'game_won';

class Game extends EventSystem {
    constructor() {
        super();
        this.board = new Board({height: 9, width: 9, mines: 10});
        this.state = START;
    }

    cellReachable({row, col}) {
        if ([GAME_OVER, GAME_WON].indexOf(this.state) > -1) return false;
        if (!this.board.inBounds(row, col)) {
            this.trigger(BOUNDS_ERROR, row, col);
            return false;
        }
        return true;
    }

    onCellSelect({row, col}) {
        if (!this.cellReachable({row: row, col: col})) return;

        let cellSelected = this.board.cells[row][col];
        if (cellSelected.mine) {
            this.board.revealMines();
            this.state = GAME_OVER;
            this.trigger(GAME_OVER);
            return;
        } else {
            this.board.select(row, col);
            if (this.isWon()) {
                this.state = GAME_WON;
                this.trigger(GAME_WON);
            }
        }
    }

    onCellFlag({row, col}) {
        if (!this.cellReachable({row: row, col: col})) return;
        this.board.toggleFlag(row, col);
    }

    onRestart() {
        this.board = new Board();
        this.state = START;
    }

    isWon() {
        return this.board.cells.every((row) => {
            return row.every((cell) => {
                return cell.visible || cell.mine;
            });
        });
    }
}

module.exports = Game;