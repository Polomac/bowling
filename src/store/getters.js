export default {
  frames: (state) => {
    console.log(state.frames);
    return state.frames;
  },
  totalPoints: (state) => {
    let pointsArr = state.frames.map((el) => el.framePoints && el.framePoints.length > 0 ? el.framePoints : []);
    console.log('POINTS', pointsArr);
    return pointsArr.flat().reduce((a,b) => a+b, 0);
  },
};
