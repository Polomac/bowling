export default {
  frames: (state) => {
    return state.frames;
  },
  totalPoints: (state) => {
    let pointsArr = state.frames.map((el) => el.framePoints && el.framePoints.length > 0 ? el.framePoints : []);
    return pointsArr.flat().reduce((a,b) => a+b, 0);
  },
};
