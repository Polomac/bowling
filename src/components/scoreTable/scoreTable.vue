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
        <span v-if="frame.spare && frame.id < 10">/</span>
        <span v-if="hasPoints(frame) && !frame.strike && frame.id < 10 && !frame.spare">{{frame.framePoints[1]}}</span>
        <span v-if="hasPoints(frame) && !frame.strike && frame.id === 10">{{frame.framePoints[1]}}</span>
      </div>
      <div class="frame-roll spare" v-if="frame.id === 10">
        <span v-if="hasPoints(frame) && !frame.strike">{{lastSpare(frame.framePoints)}}</span>
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
    lastSpare(pins) {
      return pins[2] === 10 ? 'X' : pins[0] + pins[1] + pins[2] === 10 ? '/' : pins[2];
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
    box-shadow: 0px 0px 2px rgba(0,0,0,0.35);
    max-width: 60px;
    width: 60px;
    border-radius: 4px;
    .frame-number {
      flex-grow: 2;
      text-align: left;
      padding-left: 5px;
      font-weight: 600;
      width: 100%;
      color: white;
      background: $title-light;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
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
      font-weight: 600;
      min-height: 20px;
      min-width: 100%;
      border-top: 1px solid $primary;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &.thirds {
      .frame-roll {
        width: calc(100% / 3);
      }
    }
  }
}
</style>
