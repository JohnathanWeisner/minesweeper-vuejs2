const Board = require('./Board.js')
const EventSystem = require('./EventSystem.js')
const Timer = require('./Timer.js');
const NEW = 'new';
const RUNNING = 'running';
const BOUNDS_ERROR = 'bounds_error';
const GAME_OVER = 'game_over';
const GAME_WON = 'game_won';

function _getBoardForSkill(skill) {
    const skillLevels = {
        beginner: {height: 9, width: 9, mines: 10},
        intermediate: {height: 16, width: 16, mines: 40},
        expert: {height: 16, width: 30, mines: 99}
    };

    return skillLevels[skill];
}

class Game extends EventSystem {
    constructor({skill = 'beginner', height = 9, width = 9, mines = 10} = {}) {
        super();
        this.boardDefaults = _getBoardForSkill(skill);
        if (!this.boardDefaults) {
            this.boardDefaults = {
                height,
                width,
                mines
            };
        }
        this.board = new Board(this.boardDefaults);
        this.timer = new Timer;
        this.state = NEW;
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
        if (this.state === NEW) {
            this.state = RUNNING;
            this.timer.start();
        }
        let cellSelected = this.board.cells[row][col];

        if (cellSelected.flagged) return;
        if (cellSelected.mine) {
            this.timer.pause();
            this.board.revealMines();
            this.state = GAME_OVER;
            this.trigger(GAME_OVER);
        } else {
            this.board.select(row, col);
            if (this.isWon()) {
                this.timer.pause();
                this.state = GAME_WON;
                this.trigger(GAME_WON);
            }
        }
    }

    onCellFlag({row, col}) {
        if (!this.cellReachable({row: row, col: col})) return;
        let cellSelected = this.board.cells[row][col];
        if (cellSelected.visible) return;
        this.board.toggleFlag(row, col);
    }

    onRestart() {
        this.board = new Board(this.boardDefaults);
        this.timer = new Timer;
        this.state = NEW;
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