const Board = require('./Board.js')
const EventSystem = require('./EventSystem.js')
const START = 'start';
const BOUNDS_ERROR = 'bounds_error';
const GAME_OVER = 'game_over';

class Game extends EventSystem {
    constructor() {
        super();
        this.board = new Board();
        this.state = START;
    }

    onCellSelect({row, col}) {
        if (this.state === GAME_OVER) return;
        if (!this.board.inBounds(row, col)) {
            this.trigger(BOUNDS_ERROR, row, col);
            return;
        }
        let cellSelected = this.board.cells[row][col];
        if (cellSelected.mine) {
            this.board.select(row, col);
            this.state = GAME_OVER;
            this.trigger(GAME_OVER);
            return;
        } else {
            this.board.select(row, col);
        }
    }
}

let game = new Game();

game.bind(BOUNDS_ERROR, (row, col) => {
    console.log('Error out of bounds', row, col);
});

game.bind(GAME_OVER, (row, col) => {
    console.log('The game is over.');
});

game.onCellSelect({row: -1, col: 2});
game.onCellSelect({row: 1, col: 2});
game.onCellSelect({row: 1, col: 3});
game.onCellSelect({row: 1, col: 4});

console.log(game.board.cells.map((row) => {
    return row.map((cell) => {
        return !cell.visible ? '[ ]' : (cell.mine ? '[X]' : '[' + cell.nearCount + ']');
    });
}));