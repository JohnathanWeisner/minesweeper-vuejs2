const Cell = require('./Cell.js');
const opts = {height: 9, width: 9, mines: 10};

function _interateMatrix(rows, columns, cb) {
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < columns; col++) {
            cb(row, col);
        }
    }
}

function _random(min, max) {
    return Math.floor((Math.random() * (max - min))) + min;
}

function _randomCoord(height, width) {
    return {
        row: _random(0, height),
        col: _random(0, width)
    };
}

function _generateRandomMineCoords(height, width, mines) {
    var uniqueMineHash = Object.create(null);
    var mineCount = 0;
    var coord;

    while (mineCount < mines) {
        coord = _randomCoord(height, width);
        if (typeof uniqueMineHash[coord.row] === 'undefined') {
            uniqueMineHash[coord.row] = {};
            uniqueMineHash[coord.row][coord.col] = true;
            mineCount++;
        } else if (typeof uniqueMineHash[coord.row][coord.col] === 'undefined') {
            uniqueMineHash[coord.row][coord.col] = true;
            mineCount++;
        }
    }

    return uniqueMineHash;
}

class Board {
    constructor({height = opts.height, width = opts.width, mines = opts.mines} = {}) {
        this.height = height;
        this.width = width;
        this.cells = this.generateCells(height, width, mines);
        this.setMineNearCounts();
    }

    inBounds(row, col) {
        return row < this.height && row >= 0 && col < this.width && col >= 0;
    }

    eachCell(cb) {
        _interateMatrix(this.height, this.width, (row, col) => {
            cb(this.cells[row][col], row, col);
        });
    }

    eachCellAround(row, col, cb) {
        for (var rowIndex = row - 1; rowIndex < row + 2; rowIndex++) {
            for (var colIndex = col - 1; colIndex < col + 2; colIndex++) {
                if (this.inBounds(rowIndex, colIndex) &&
                    !(colIndex === col && rowIndex === row)) {

                    cb(this.cells[rowIndex][colIndex], rowIndex, colIndex);
                }
            }
        }
    }

    setMineNearCounts() {
        this.eachCell((cell, row, col) => {
            if (cell.mine) {
                this.eachCellAround(row, col, (surroundingCell) => {
                    surroundingCell.nearCount++;
                });
            }
        });
    }

    generateCells(height, width, mines) {
        var isMineChecker = _generateRandomMineCoords(height, width, mines);
        var cells = [];

        _interateMatrix(height, width, (row, col) => {
            var isMine = !!(isMineChecker[row] && isMineChecker[row][col]);

            if (!cells[row]) {
                cells.push([]);
            }
            cells[row].push(new Cell({mine: isMine}));
        });

        return cells;
    }

    revealAround(row, col) {
        if (this.inBounds(row, col)) {
            let cell = this.cells[row][col];

            if ((cell.nearCount === 0 || cell.nearCount === 1) && !cell.visible && !cell.mine) {
                cell.visible = true;
                if (cell.nearCount === 0) {
                    this.eachCellAround(row, col, (cell, row, col) => {
                        this.revealAround(row, col);
                    });
                }
            }
        }
    }

    select(row, col) {
        if (this.inBounds(row, col)) {
            if (this.cells[row][col].nearCount === 0) {
                this.revealAround(row, col);
            } else {
                this.cells[row][col].visible = true;
            }
        }
    }
}

module.exports = Board;