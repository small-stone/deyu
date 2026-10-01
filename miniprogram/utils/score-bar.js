function isLowScore(score) {
  return Number(score) < 40;
}

function personalBarWidth(score) {
  const value = Number(score);
  if (!Number.isFinite(value) || value <= 0) return 8;
  return Math.min(100, Math.max(8, Math.round(value)));
}

module.exports = {
  isLowScore,
  personalBarWidth,
};
