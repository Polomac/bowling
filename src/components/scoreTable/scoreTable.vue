<template>
  <div class="score-table-wrapper">
    <h2 class="total">Total score: {{totalPoints}}</h2>
    <div class="frame-score" v-for="frame in frames" :key="frame.id" :class="{'thirds': frame.id === 10}">
      <div class="frame-number">
        {{frame.id}}
      </div>
      <div class="frame-roll">
        <span v-if="frame.strike">X</span>
        <span v-if="hasPoints(frame) && !frame.strike">{{lastStrike(frame.framePoints[0])}}</span>
      </div>
      <div class="frame-roll spare">
        <span v-if="frame.spare">/</span>
        <span v-if="hasPoints(frame) && !frame.strike && !frame.spare">{{frame.framePoints[1]}}</span>
      </div>
      <div class="frame-roll spare" v-if="frame.id === 10">
        <span v-if="frame.spare">/</span>
        <span v-if="hasPoints(frame) && !frame.strike && !frame.spare">{{frame.framePoints[2]}}</span>
      </div>
      <div class="points">
        <span v-if="frame.framePoints && frame.framePoints.length > 0">{{frameResult(frame.framePoints)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import{ mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['frames']),
    totalPoints() {
      let pointsArr = this.frames.map((el) => el.framePoints && el.framePoints.length > 0 ? el.framePoints : []);
      return pointsArr.flat().reduce((a,b) => a+b, 0);
    },
  },
  methods:{
    frameResult(framePoints) {
      return framePoints.reduce((a,b) => a+b);
    },
    hasPoints(frame) {
      return frame && frame.framePoints;
    },
    lastStrike(pins) {
      return pins === 10 ? 'X' : pins;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/default.scss';

.score-table-wrapper {
  display: flex;
  font-size: 0.875em;
  background: white;
  padding: 10px;
  justify-content: space-between;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.35);
  border-radius: 4px;
  flex-wrap: wrap;
  .total {
    width: 100%;
    padding: 0;
    margin: 0 0 20px 0;
    color: $accent;
  }
  .frame-score {
    display: flex;
    flex-wrap: wrap;
    border: 2px solid $primary;
    max-width: 60px;
    width: 60px;
    .frame-number {
      flex-grow: 2;
      text-align: center;
      font-weight: 500;
      width: 100%;
      border-bottom: 1px solid $primary;
    }
    .frame-roll {
      width: 50%;
      text-align: center;
      height: 20px;
      &.spare {
        border-left: 1px solid $primary;
      }
    }
    .points {
      flex-grow: 2;
      text-align: center;
      font-weight: 500;
      border-top: 1px solid $primary;
      min-height: 20px;
      min-width: 100%;
    }
    &.thirds {
      .frame-roll {
        width: calc(100% / 3);
      }
    }
  }
}
</style>
