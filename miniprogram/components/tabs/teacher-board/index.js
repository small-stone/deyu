const store = require('../../../data/demo-store');

Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: { active: { type: Boolean, value: false } },
  data: { className: '', stats: [], distribution: [], listMode: 'high', list: [] },
  observers: { active(v) { if (v) this.refresh(); } },
  lifetimes: { attached() { if (this.data.active) this.refresh(); } },
  methods: {
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
  },
});
