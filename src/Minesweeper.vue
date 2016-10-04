<template>
<div>
<h1>{{state}}</h1>
<ol id="board">
    <li class="row" v-for="(row, rindex) in board">
        <div class="cell-container" v-for="(cell, cindex) in row">
            <div class="cell"
                v-bind:data-row="rindex"
                v-bind:data-col="cindex"
                v-on:click="clickCell"
                v-on:contextmenu="flag">

                <span v-if="cell.visible">
                    <span v-if="cell.nearCount == 0">&nbsp;</span>
                    <span v-else>{{cell.nearCount}}</span>
                </span>
                <span v-else>
                    <span v-if="cell.flagged">F</span>
                    <span v-else>[]</span>
                </span>
            </div>
        </div>
    </li>
</ol>
</div>

</template>

<script>
const Game = require('./Game.js');
const game = new Game();
const getRowCol = (target) => {
let data = target.dataset;

    return {
        row: parseInt(data.row),
        col: parseInt(data.col),
    };
};

export default {
    data: {
        state: game.state,
        board: game.board.cells
    },
    methods: {
        clickCell: function (e) {
            e.preventDefault();

            game.onCellSelect(getRowCol(e.target));
            this.board = game.board.cells;
            this.state = game.state;
        },
        flag: function (e) {
            e.preventDefault();

            game.onCellFlag(getRowCol(e.target));
            this.board = game.board.cells;
            this.state = game.state;
        }
    }
};

</script>

<style lang="sass">

.row {
    height: 27px;
    width: 243px;
}

.cell {
    height: 25px;
    width: 25px;
    border: 1px solid black;
    display: inline-block;
    text-align: center;
}

.cell-container {
    display: inline-block;
}

.unselectable {
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */      
}

span {
    pointer-events: none;
}

</style>
