<template>
  <div class="controls-wrapper">
    <button class="ripple blue raised" @click="frameAction" :disabled="disabled" :class="{'disabled' : disabled}">Roll</button>
    <button class="ripple green raised" @click="restart" v-if="frames.length > 0">Restart Game</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      frames: [],
      rollNumber: 1,
      tempPins: 11,
      framePoints: [],
      frameNumber: 0,
      disabled: false,
    };
  },
  methods: {
    ...mapMutations(['resetFrames']),
    ...mapActions(['setFrames']),
    droppedPins(min, max) {
      return max === min ? max : Math.floor(Math.random() * (max - min + 1) + min);
    },
    setFramePoints(leftPins) {
      this.framePoints.push((this.tempPins - leftPins));
      if(this.frameNumber > 0 && this.frames[this.frameNumber - 1].strike && this.rollNumber === 2) {
        this.frames[this.frameNumber - 1].framePoints.push(this.framePoints.reduce((a,b) => a + b, 0));
      } else if(this.frameNumber > 0 && this.frames[this.frameNumber - 1].spare && this.rollNumber === 2) {
        this.frames[this.frameNumber - 1].framePoints.push(this.framePoints[0]);
      }

    },
    setTempFrame(isStrike, isSpare) {
      this.frames[this.frameNumber]= {
        strike: isStrike,
        framePoints: this.framePoints,
        spare: isSpare,
        id: this.frameNumber + 1,
      };
    },
    frameAction() {
      this.disabled = true;
      let leftPins = this.tempPins - this.droppedPins(0, this.tempPins);
      this.setFramePoints(leftPins);
      if (leftPins === 0 && this.rollNumber === 1) {
        let isStrike = true;
        let isSpare = false;
        this.setTempFrame(isStrike, isSpare);
        this.frameNumber < 9 ? this.rollNumber += 2 : this.rollNumber += 1;

      } else if (leftPins >= 0 && this.rollNumber >= 1) {
        let isStrike = false;
        let isSpare = leftPins === 0 && this.rollNumber < 3;
        this.setTempFrame(isStrike, isSpare);
        this.rollNumber += 1;
        this.tempPins = leftPins;
      }
      this.setFrames({
        frames: this.frames,
        frameNumber: this.frameNumber,
      }).then((resp) => {
        if (resp) {
          this.disabled = false;
        }
      });
      this.$emit('update');
      if (this.frameNumber >= 10) {
        this.restart();
      }
      if ((this.rollNumber > 2 && this.frameNumber < 9) || (this.rollNumber > 3 && this.frameNumber === 9)) {
        this.rollNumber = 1;
        this.framePoints = [];
        this.frameNumber ++;
        this.tempPins = 10;
      }
    },
    restart() {
      this.tempPins = 10;
      this.frames = [];
      this.rollNumber = 1;
      this.framePoints = [];
      this.frameNumber = 0;
      this.resetFrames();
      this.$emit('update');
    },
  },
  beforeMount() {
    this.restart();
  },
};
</script>

<style lang="scss" scoped>
.controls-wrapper {
  margin-top: 30px;
  .ripple {
    width: 100%;
    margin-bottom: 20px;
    height: 40px;
    &.disabled {
      background: gray;
    }
  }
}
</style>
