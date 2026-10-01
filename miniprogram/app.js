const store = require('./data/demo-store');

App({
  onLaunch() {
    this.globalData = {
      currentRole: null,
      env: '',
    };
    // Demo mode: do not init cloud / call cloud APIs
  },

  setRole(role) {
    this.globalData.currentRole = role;
  },

  clearRole() {
    this.globalData.currentRole = null;
  },

  getRole() {
    return this.globalData.currentRole;
  },

  enterParent() {
    this.setRole('parent');
    wx.reLaunch({ url: '/pages/parent/home/index' });
  },

  enterTeacher() {
    this.setRole('teacher');
    const state = store.getState();
    if (state.teacherMode === 'empty' && !state.currentClassId) {
      wx.reLaunch({ url: '/pages/teacher/setup-class/index' });
      return;
    }
    if (state.teacherMode === 'empty' && state.currentClassId) {
      const cls = store.getCurrentTeacherClass();
      const count = store.getStudentsByClass(state.currentClassId).length;
      if (!cls || count === 0) {
        wx.reLaunch({ url: '/pages/teacher/setup-roster/index' });
        return;
      }
    }
    wx.reLaunch({ url: '/pages/teacher/home/index' });
  },

  enterAdmin() {
    this.setRole('admin');
    wx.reLaunch({ url: '/pages/admin/overview/index' });
  },

  switchRole() {
    this.clearRole();
    wx.reLaunch({ url: '/pages/welcome/index' });
  },

  resetTeacherEmptyDemo() {
    store.resetTeacherEmpty();
    this.enterTeacher();
  },

  reseedDemo() {
    store.reseedReady();
    wx.showToast({ title: '已重置演示数据', icon: 'none' });
  },

  store,
});
