const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    className: '352',
  },

  onShow() {
    app.setRole('teacher');
  },

  onInput(e) {
    this.setData({ className: e.detail.value });
  },

  submit() {
    const name = (this.data.className || '').trim();
    if (!name) {
      wx.showToast({ title: '请填写班级编号', icon: 'none' });
      return;
    }
    store.createClass(name);
    wx.navigateTo({ url: '/pages/teacher/setup-roster/index' });
  },
});
