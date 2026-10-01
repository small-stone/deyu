const app = getApp();

const TITLES = {
  overview: '全校总览',
  rank: '全校排名',
  classes: '班级列表',
  profile: '设置',
};

Page({
  data: {
    tab: 'overview',
    visited: { overview: true, rank: false, classes: false, profile: false },
  },

  onLoad(query) {
    app.setRole('admin');
    this.switchTab(query.tab || 'overview', true);
  },

  onShow() {
    app.setRole('admin');
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
