<template>
  <div id="app">
    <h1>Bowling score</h1>
    <div class="content">
      <score-table :key="i"></score-table>
      <game-controls @update="update"></game-controls>
    </div>
  </div>
</template>

<script>
const scoreTable = () => import('./components/scoreTable/scoreTable.vue');
const gameControls = () => import('./components/gameControls/gameControls.vue');
import { mapGetters } from 'vuex';
export default {
  name: 'app',
  data() {
    return {
      i: 1,
    };
  },
  methods: {
    update() {
      this.i++;
    },
  },
  components: {
    scoreTable,
    gameControls,
  },
};
</script>

<style lang="scss">
@import './assets/reset.scss';
#app {
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  @include mqBPoint(800px) {
    width: 800px;
  }
}
</style>
