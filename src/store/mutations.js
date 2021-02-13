export default {
  setFrames(state, payload) {
    state.frames[payload.frameNumber] = payload.frames[payload.frameNumber];
  },
  resetFrames(state) {
    state.frames = [{id:1,}, {id:2,}, {id:3,}, {id:4,}, {id:5,}, {id:6,}, {id:7,}, {id:8,}, {id:9,}, {id:10,}];
  },
};
