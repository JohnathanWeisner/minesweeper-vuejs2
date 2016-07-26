class Cell {
    constructor({bomb = false, near = 0} = {}) {
        this.bomb = bomb;
        this.near = near;
    }
}

module.exports = Cell;