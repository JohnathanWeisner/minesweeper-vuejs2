class Cell {
    constructor({mine = false, nearCount = 0, visible = false, flagged = false} = {}) {
        this.mine = mine;
        this.nearCount = nearCount;
        this.visible = visible;
        this.flagged = flagged;
    }
}

module.exports = Cell;