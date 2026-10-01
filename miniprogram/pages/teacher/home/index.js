const app = getApp();
const store = require('../../../data/demo-store');

Page({
  data: {
    className: '',
    teacherName: '',
    studentCount: 0,
    stats: [],
    attention: [],
    emptyStudents: false,
  },

  onShow() {
    app.setRole('teacher');
    const state = store.getState();
    if (state.teacherMode === 'empty' && !state.currentClassId) {
      wx.redirectTo({ url: '/pages/teacher/setup-class/index' });
      return;
    }
    const info = store.getTeacherHomeStats();
    if (!info) {
      wx.redirectTo({ url: '/pages/teacher/setup-class/index' });
      return;
    }
    const cls = info.class;
    const liveCount = store.getStudentsByClass(cls.id).length;
    this.setData({
      className: cls.name,
      teacherName: cls.teacherName,
      studentCount: liveCount || cls.studentCount,
      emptyStudents: liveCount === 0,
      stats: [
        { k: '平均分', v: cls.avg, s: '全班' },
        { k: '今日变动', v: cls.todayChanges, s: '次' },
        { k: '最高分', v: cls.high, s: cls.highName, tone: 'hi' },
        { k: '最低分', v: cls.low, s: cls.lowName, tone: 'lo' },
      ],
      attention: info.attention,
    });
  },

  goRoster() {
    wx.redirectTo({ url: '/pages/teacher/roster/index' });
  },

  goScore() {
    if (this.data.emptyStudents) {
      wx.showToast({ title: '请先添加学生', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: '/pages/teacher/score/index' });
  },

  goBoard() {
    wx.redirectTo({ url: '/pages/teacher/board/index' });
  },

  goStudent(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/teacher/score/index?id=${id}` });
  },
});
