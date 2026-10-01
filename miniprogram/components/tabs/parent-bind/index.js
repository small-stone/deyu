const store = require('../../../data/demo-store');

Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: {
    active: { type: Boolean, value: false },
  },
  data: { name: '', idNumber: '' },
  methods: {
    onName(e) { this.setData({ name: e.detail.value }); },
    onId(e) { this.setData({ idNumber: e.detail.value }); },
    submit() {
      const { name, idNumber } = this.data;
      if (!name.trim() || !idNumber.trim()) {
        wx.showToast({ title: '请填写姓名和证件号', icon: 'none' });
        return;
      }
      const res = store.bindChild(name.trim(), idNumber.trim());
      if (res.ok) {
        wx.showToast({ title: '绑定成功', icon: 'success' });
        this.setData({ name: '', idNumber: '' });
        this.triggerEvent('switchtab', { key: 'home' });
      }
    },
  },
});
