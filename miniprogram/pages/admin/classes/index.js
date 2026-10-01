const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    classes: [],
  },

  onShow() {
    app.setRole('admin');
    this.setData({ classes: store.getState().classes });
  },

  openClass(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/teacher/board/index?preview=1&classId=${id}` });
  },
});
