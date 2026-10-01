const store = require('../../../data/demo-store');

function goBack() {
  wx.navigateBack({
    fail: () => wx.reLaunch({ url: '/pages/teacher/main/index' }),
  });
}

Page({
  data: {
    student: null,
    className: '',
    mode: 'add',
    amount: '3',
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

  // Allow digits + at most one decimal place (e.g. 1.5)
  onAmount(e) {
    let raw = String(e.detail.value || '');
    raw = raw.replace(/[^\d.]/g, '');
    const firstDot = raw.indexOf('.');
    if (firstDot !== -1) {
      const intPart = raw.slice(0, firstDot).replace(/\./g, '');
      const fracPart = raw.slice(firstDot + 1).replace(/\./g, '').slice(0, 1);
      raw = `${intPart}.${fracPart}`;
    } else {
      raw = raw.replace(/\./g, '');
    }
    this.setData({ amount: raw });
    return raw;
  },

  onReason(e) {
    this.setData({ reason: e.detail.value });
  },

  pickTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ activeTag: tag, reason: tag });
  },

  cancel() {
    goBack();
  },

  submit() {
    const { student, mode, amount, reason } = this.data;
    if (!student) return;
    const value = Math.round(Number(amount) * 10) / 10;
    if (!Number.isFinite(value) || value <= 0) {
      wx.showToast({ title: '请输入分值', icon: 'none' });
      return;
    }
    const delta = mode === 'add' ? value : -value;
    const res = store.adjustScore(student.id, delta, reason);
    if (!res.ok) {
      wx.showToast({ title: res.message || '提交失败', icon: 'none' });
      return;
    }
    wx.showToast({ title: mode === 'add' ? '加分成功' : '减分成功', icon: 'success' });
    this.setData({ student: res.student });
    setTimeout(goBack, 500);
  },
});
