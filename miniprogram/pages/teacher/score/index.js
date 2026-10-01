const store = require('../../../data/demo-store');

Page({
  data: {
    student: null,
    className: '',
    mode: 'add',
    amount: 3,
    reason: '',
    tags: [],
    activeTag: '',
  },

  onLoad(query) {
    const cls = store.getCurrentTeacherClass();
    let student = query.id ? store.getStudent(query.id) : null;
    if (!student && cls) {
      student = store.getStudentsByClass(cls.id)[0];
    }
    this.setData({
      student,
      className: (cls && cls.name) || '',
      tags: store.getState().reasonTags,
      reason: '课堂助人为乐，主动帮助同桌整理文具',
      activeTag: '助人为乐',
    });
  },

  setMode(e) {
    this.setData({ mode: e.currentTarget.dataset.mode });
  },

  onAmount(e) {
    this.setData({ amount: Number(e.detail.value) || 0 });
  },

  onReason(e) {
    this.setData({ reason: e.detail.value });
  },

  pickTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ activeTag: tag, reason: tag });
  },

  cancel() {
    wx.navigateBack({ fail: () => wx.redirectTo({ url: '/pages/teacher/roster/index' }) });
  },

  submit() {
    const { student, mode, amount, reason } = this.data;
    if (!student) return;
    if (!amount || amount <= 0) {
      wx.showToast({ title: '请输入分值', icon: 'none' });
      return;
    }
    const delta = mode === 'add' ? amount : -amount;
    const res = store.adjustScore(student.id, delta, reason);
    if (!res.ok) {
      wx.showToast({ title: res.message || '提交失败', icon: 'none' });
      return;
    }
    wx.showToast({ title: mode === 'add' ? '加分成功' : '减分成功', icon: 'success' });
    this.setData({ student: res.student });
    setTimeout(() => {
      wx.navigateBack({ fail: () => wx.redirectTo({ url: '/pages/teacher/home/index' }) });
    }, 500);
  },
});
