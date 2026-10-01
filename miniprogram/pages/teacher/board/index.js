const app = getApp();
const store = require('../../../data/demo-store');
const { isLowScore, personalBarWidth } = require('../../../utils/score-bar');

Page({
  data: {
    className: '',
    stats: [],
    distribution: [],
    listMode: 'high',
    list: [],
    preview: false,
    classId: '',
  },

  onLoad(query) {
    this.setData({
      preview: query.preview === '1',
      classId: query.classId || '',
    });
  },

  onShow() {
    if (!this.data.preview) {
      app.setRole('teacher');
    }
    this.refresh();
  },

  refresh() {
    const board = store.getClassBoard(this.data.classId || undefined);
    if (!board) return;
    const cls = board.class;
    const list = this.data.listMode === 'high' ? board.highList : board.lowList;
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
        width: personalBarWidth(s.score),
        low: isLowScore(s.score),
      })),
    });
  },

  setListMode(e) {
    this.setData({ listMode: e.currentTarget.dataset.mode }, () => this.refresh());
  },

  openStudent(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/common/student-detail/index?id=${id}` });
  },
});
