const app = getApp();
const store = require('../../../data/demo-store');
const ROLE_LABEL = { parent: '家长', teacher: '班主任', admin: '管理员' };

Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: {
    role: { type: String, value: 'parent' },
    active: { type: Boolean, value: false },
  },
  data: { roleLabel: '家长' },
  observers: {
    role(role) {
      this.setData({ roleLabel: ROLE_LABEL[role] || role });
    },
  },
  lifetimes: {
    attached() {
      this.setData({ roleLabel: ROLE_LABEL[this.data.role] || this.data.role });
    },
  },
  methods: {
    switchRole() { app.switchRole(); },
    resetEmpty() { app.resetTeacherEmptyDemo(); },
    reseed() {
      store.reseedReady();
      wx.showToast({ title: '已恢复就绪数据', icon: 'none' });
    },
  },
});
