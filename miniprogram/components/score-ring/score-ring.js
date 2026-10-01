Component({
  properties: {
    score: { type: Number, value: 60 },
    max: { type: Number, value: 100 },
  },
  observers: {
    'score, max': function (score, max) {
      const pct = Math.max(0, Math.min(100, Math.round((score / (max || 100)) * 100)));
      this.setData({ pct });
    },
  },
  data: { pct: 60 },
});
