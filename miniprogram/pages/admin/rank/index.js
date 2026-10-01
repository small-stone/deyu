const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    dim: 'class', // class | person
    listMode: 'high',
    school: {},
    stats: [],
    distribution: [],
    list: [],
    listTitle: '',
  },

  onShow() {
    app.setRole('admin');
    this.refresh();
  },

  refresh() {
    const school = store.getState().school;
    const dim = this.data.dim;
    let stats = [];
    let list = [];
    let listTitle = '';
    if (dim === 'class') {
      stats = [
        { k: '最高均分', v: 78.6, s: '551', tone: 'hi' },
        { k: '最低均分', v: 63.2, s: '443', tone: 'lo' },
      ];
      list = school.classRank.map((r, i) => ({
        name: r.name,
        score: r.score,
        rank: i + 1,
        width: Math.max(8, Math.round((r.score / school.classRank[0].score) * 100)),
      }));
      listTitle = '班级均分排行';
    } else {
      stats = [
        { k: '最高分', v: school.high, s: '周启 · 351', tone: 'hi' },
        { k: '最低分', v: school.low, s: '刘可 · 443', tone: 'lo' },
      ];
      const src = this.data.listMode === 'high' ? school.personHigh : school.personLow;
      const maxAbs = Math.max(...src.map((r) => Math.abs(r.score)), 1);
      list = src.map((r, i) => ({
        name: r.name,
        score: r.score,
        rank: i + 1,
        width: Math.max(8, Math.round((Math.abs(r.score) / maxAbs) * 100)),
      }));
      listTitle = this.data.listMode === 'high' ? '个人高分榜' : '低分关注';
    }
    this.setData({
      school,
      stats,
      distribution: school.distribution,
      list,
      listTitle,
    });
  },

  setDim(e) {
    this.setData({ dim: e.currentTarget.dataset.dim }, () => this.refresh());
  },

  setListMode(e) {
    this.setData({ listMode: e.currentTarget.dataset.mode }, () => this.refresh());
  },
});
