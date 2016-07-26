const Cell = require('./Cell.js');

class Board {
    constructor({height = 9, width = 9, mines = 10} = {}) {
        this.height = height;
        this.width = width;
    }
}

module.exports = Board;