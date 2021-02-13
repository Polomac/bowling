<template>
  <div class="controls-wrapper">
    <button class="ripple green raised" @click="restart" v-show="frames.length > 0">Restart Game</button>
    <button class="ripple blue raised" @click="frameAction" :disabled="disabled" :class="{'disabled' : disabled}">Roll</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      frames: [],
      rollNumber: 1,
      tempPins: 10,
      framePoints: [],
      frameNumber: 0,
      disabled: false,
    };
  },
  methods: {
    ...mapMutations(['resetFrames']),
    ...mapActions(['setFrames']),
    droppedPins(min, max) {
      return max === 1 ? Math.round(Math.random()) : Math.round(Math.random() * (max - min) + min);
    },
    frameAction() {
      this.disabled = true;
      let leftPins = this.tempPins - this.droppedPins(0,this.tempPins);

      if (leftPins === 0 && this.rollNumber === 1) {
        console.log(this.tempPins,leftPins)
        this.framePoints.push((this.tempPins - leftPins));
        this.frames[this.frameNumber] = {
          strike: true,
          framePoints: this.framePoints,
          spare: false,
          id: this.frameNumber + 1,
        };

        this.frameNumber < 9 ? this.rollNumber += 2 : this.rollNumber += 1;

      } else if (leftPins > 0) {
        this.framePoints.push(this.tempPins - leftPins);
        console.log(leftPins);
        this.frames[this.frameNumber]= {
          strike: false,
          framePoints: this.framePoints,
          spare: leftPins === 0,
          id: this.frameNumber + 1,
        };

        this.rollNumber += 1;
        this.tempPins = leftPins;
      }
      this.setFrames({
        frames: this.frames,
        frameNumber: this.frameNumber,
      }).then((resp) => {
        if (resp) {
          console.log(resp, this.disabled);
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
