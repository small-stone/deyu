const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    className: '',
  },

  onShow() {
    app.setRole('teacher');
    const cls = store.getCurrentTeacherClass();
    if (!cls) {
      wx.navigateBack({
        fail: () => wx.redirectTo({ url: '/pages/teacher/setup-class/index' }),
      });
      return;
    }
    this.setData({ className: cls.name });
  },

  importDemo() {
    store.seedRosterForCurrentClass();
    wx.showToast({ title: '导入成功', icon: 'success' });
    setTimeout(() => app.openPage('/pages/teacher/main/index'), 400);
  },

  skip() {
    store.skipRoster();
    app.openPage('/pages/teacher/main/index');
  },
});
