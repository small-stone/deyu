const app = getApp();

const TITLES = {
  home: '本班',
  students: '花名册',
  board: '本班看板',
  profile: '我的',
};

Page({
  data: {
    tab: 'home',
    visited: { home: true, students: false, board: false, profile: false },
  },

  onLoad(query) {
    app.setRole('teacher');
    this.switchTab(query.tab || 'home', true);
  },

  onShow() {
    app.setRole('teacher');
  },

  onTabChange(e) {
    this.switchTab(e.detail.key);
  },

  onSwitchTab(e) {
    this.switchTab(e.detail.key);
  },

  switchTab(key, isLoad) {
    if (!key) return;
    if (!isLoad && key === this.data.tab) return;
    const visited = { ...this.data.visited, [key]: true };
    this.setData({ tab: key, visited });
    wx.setNavigationBarTitle({ title: TITLES[key] || '德育通' });
  },
});
