const store = require('./data/demo-store');

App({
  onLaunch() {
    this.globalData = {
      currentRole: null,
      env: '',
    };
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

  // Keep welcome in the stack so leaving and returning do not restart the app.
  openPage(url) {
    const route = url.replace(/^\//, '').split('?')[0];
    const pages = getCurrentPages();
    const index = pages.findIndex((page) => page.route === route);
    if (index >= 0) {
      const delta = pages.length - 1 - index;
      if (delta > 0) wx.navigateBack({ delta });
      return;
    }
    if (route === 'pages/welcome/index') {
      wx.redirectTo({ url });
      return;
    }
    wx.navigateTo({
      url,
      fail: () => wx.redirectTo({ url }),
    });
  },

  enterParent() {
    this.setRole('parent');
    this.openPage('/pages/parent/main/index');
  },

  enterTeacher() {
    this.setRole('teacher');
    const state = store.getState();
    if (state.teacherMode === 'empty' && !state.currentClassId) {
      this.openPage('/pages/teacher/setup-class/index');
      return;
    }
    if (state.teacherMode === 'empty' && state.currentClassId) {
      const count = store.getStudentsByClass(state.currentClassId).length;
      if (count === 0) {
        this.openPage('/pages/teacher/setup-roster/index');
        return;
      }
    }
    this.openPage('/pages/teacher/main/index');
  },

  enterAdmin() {
    this.setRole('admin');
    this.openPage('/pages/admin/main/index');
  },

  switchRole() {
    this.clearRole();
    this.openPage('/pages/welcome/index');
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
