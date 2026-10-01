const app = getApp();
const store = require('../../../data/demo-store');

const ROLE_LABEL = {
  parent: '家长',
  teacher: '班主任',
  admin: '管理员',
};

Page({
  data: {
    role: 'parent',
    roleLabel: '家长',
    tabActive: 'profile',
  },

  onLoad(query) {
    const role = query.role || app.getRole() || 'parent';
    app.setRole(role);
    this.setData({
      role,
      roleLabel: ROLE_LABEL[role] || role,
      tabActive: role === 'admin' ? 'profile' : 'profile',
    });
  },

  switchRole() {
    app.switchRole();
  },

  resetEmpty() {
    app.resetTeacherEmptyDemo();
  },

  reseed() {
    store.reseedReady();
    wx.showToast({ title: '已恢复就绪数据', icon: 'none' });
  },
});
