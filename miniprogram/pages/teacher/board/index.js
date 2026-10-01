const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    className: '',
    stats: [],
    distribution: [],
    listMode: 'high',
    list: [],
    preview: false,
  },

  onLoad(query) {
    this.setData({ preview: query.preview === '1' });
  },

  onShow() {
    if (!this.data.preview) {
      app.setRole('teacher');
    }
    this.refresh();
  },

  refresh() {
    const board = store.getClassBoard();
    if (!board) return;
    const cls = board.class;
    const list = this.data.listMode === 'high' ? board.highList : board.lowList;
    const max = list.length ? Math.max(...list.map((s) => Math.abs(s.score)), 1) : 1;
    this.setData({
      className: cls.name,
      stats: [
        { k: '最高分', v: cls.high, s: cls.highName, tone: 'hi' },
        { k: '最低分', v: cls.low, s: cls.lowName, tone: 'lo' },
      ],
      distribution: cls.distribution || [],
      list: list.map((s, i) => ({
        ...s,
        rank: i + 1,
        width: Math.max(8, Math.round((Math.abs(s.score) / max) * 100)),
      })),
    });
  },

  setListMode(e) {
    this.setData({ listMode: e.currentTarget.dataset.mode }, () => this.refresh());
  },
});
