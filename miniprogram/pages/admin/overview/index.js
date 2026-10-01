const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    school: {},
    lowAttention: [],
    classes: [],
  },

  onShow() {
    app.setRole('admin');
    const state = store.getState();
    this.setData({
      school: state.school,
      lowAttention: state.school.lowAttention,
      classes: state.classes.slice(0, 5),
    });
  },

  openClass(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/teacher/board/index?preview=1&classId=${id}` });
  },

  goClasses() {
    wx.redirectTo({ url: '/pages/admin/classes/index' });
  },
});
