const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    keyword: '',
    students: [],
  },

  onShow() {
    app.setRole('teacher');
    this.refresh();
  },

  refresh() {
    const cls = store.getCurrentTeacherClass();
    if (!cls) return;
    let list = store.getStudentsByClass(cls.id).slice().sort((a, b) => b.score - a.score);
    const kw = (this.data.keyword || '').trim();
    if (kw) {
      list = list.filter((s) => s.name.includes(kw) || String(s.studentNo).includes(kw));
    }
    this.setData({ students: list });
  },

  onSearch(e) {
    const keyword = e.detail.value;
    this.setData({ keyword });
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => this.refresh(), 200);
  },

  importDemo() {
    store.seedRosterForCurrentClass();
    wx.showToast({ title: '已刷新花名册', icon: 'none' });
    this.refresh();
  },

  openScore(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/teacher/score/index?id=${id}` });
  },
});
