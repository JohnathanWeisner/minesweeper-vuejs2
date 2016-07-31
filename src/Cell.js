class Cell {
    constructor({mine = false, nearCount = 0, visible = false} = {}) {
        this.mine = mine;
        this.nearCount = nearCount;
        this.visible = visible;
    }
}

module.exports = Cell;