<script>
const Vue = require('vue');
const Minesweeper = require('./Minesweeper.vue');
document.addEventListener('DOMContentLoaded', () => {
    const app = new Vue(Minesweeper).$mount('#minesweeper');
});
</script>