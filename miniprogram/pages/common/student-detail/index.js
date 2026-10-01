const store = require('../../../data/demo-store');
const { isLowScore } = require('../../../utils/score-bar');

Page({
  data: {
    student: null,
    className: '',
    studentNo: '',
    score: '',
    low: false,
    logs: [],
    missing: false,
  },

  onLoad(query) {
    this.studentId = query.id || '';
  },

  onShow() {
    const student = this.studentId ? store.getStudent(this.studentId) : null;
    if (!student) {
      this.setData({
        student: null,
        missing: true,
        logs: [],
        className: '',
        studentNo: '',
        score: '',
        low: false,
      });
      return;
    }
    const cls = store.getClass(student.classId);
    this.setData({
      missing: false,
      student,
      className: (cls && cls.name) || '',
      studentNo: student.studentNo,
      score: student.score,
      low: isLowScore(student.score),
      logs: store.getLogsForStudent(student.id),
    });
  },
});
