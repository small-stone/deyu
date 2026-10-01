const app = getApp();

const TITLES = {
  home: '我的孩子',
  bind: '绑定孩子',
  profile: '我的',
};

Page({
  data: {
    tab: 'home',
    visited: { home: true, bind: false, profile: false },
  },

  onLoad(query) {
    app.setRole('parent');
    const tab = query.tab || 'home';
    this.switchTab(tab, true);
  },

  onShow() {
    app.setRole('parent');
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
