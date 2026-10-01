const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    name: '',
    idNumber: '',
  },

  onShow() {
    app.setRole('parent');
  },

  onName(e) {
    this.setData({ name: e.detail.value });
  },

  onId(e) {
    this.setData({ idNumber: e.detail.value });
  },

  submit() {
    const { name, idNumber } = this.data;
    if (!name.trim() || !idNumber.trim()) {
      wx.showToast({ title: '请填写姓名和证件号', icon: 'none' });
      return;
    }
    const res = store.bindChild(name.trim(), idNumber.trim());
    if (res.ok) {
      wx.showToast({ title: '绑定成功', icon: 'success' });
      setTimeout(() => {
        wx.navigateBack({
          fail: () => wx.redirectTo({ url: '/pages/parent/home/index' }),
        });
      }, 500);
    }
  },
});
