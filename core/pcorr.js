module.exports = (x, y) => {
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0,
      sumY2 = 0;
    const minLength = x.length = y.length = Math.min(x.length, y.length),
      reduce = (xi, idx) => {
        const yi = y[idx];
        sumX += xi;
        sumY += yi;
        sumXY += xi * yi;
        sumX2 += xi * xi;
        sumY2 += yi * yi;
      }
    x.forEach(reduce);
    let j = Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY));
    return j ? (minLength * sumXY - sumX * sumY) / j : 0 ;
};
