const store = require('../../../data/demo-store');

Page({
  data: {
    child: null,
    className: '',
    logs: [],
  },

  onShow() {
    const child = store.getSelectedChild();
    if (!child) {
      wx.redirectTo({ url: '/pages/parent/home/index' });
      return;
    }
    const cls = store.getClass(child.classId);
    this.setData({
      child,
      className: (cls && cls.name) || '',
      logs: store.getLogsForStudent(child.id),
    });
  },

  back() {
    wx.navigateBack({ fail: () => wx.redirectTo({ url: '/pages/parent/home/index' }) });
  },
});
