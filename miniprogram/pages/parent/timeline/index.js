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
      wx.navigateBack({
        fail: () => wx.reLaunch({ url: '/pages/parent/main/index' }),
      });
      return;
    }
    const cls = store.getClass(child.classId);
    this.setData({
      child,
      className: (cls && cls.name) || '',
      logs: store.getLogsForStudent(child.id),
    });
  },
});
