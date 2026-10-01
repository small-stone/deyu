// In-memory demo store seeded from designs/index.html mock copy.

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const DIST_LABELS = ['<0', '0-40', '41-60', '61-80', '81+'];

function bucketLabel(score) {
  if (score < 0) return '<0';
  if (score <= 40) return '0-40';
  if (score <= 60) return '41-60';
  if (score <= 80) return '61-80';
  return '81+';
}

function distributionFromStudents(students) {
  const counts = {};
  DIST_LABELS.forEach((label) => {
    counts[label] = 0;
  });
  students.forEach((student) => {
    counts[bucketLabel(student.score)] += 1;
  });
  const max = Math.max(...DIST_LABELS.map((label) => counts[label]), 1);
  return DIST_LABELS.map((label) => ({
    label,
    count: counts[label],
    height: Math.max(8, Math.round((counts[label] / max) * 52)),
    low: label === '<0' || label === '0-40',
  }));
}

function applyNon352Stats(seed) {
  seed.classes.forEach((cls) => {
    if (cls.id === 'c352') return;
    const roster = seed.students.filter((student) => student.classId === cls.id);
    if (!roster.length) return;
    const high = roster.slice().sort((a, b) => b.score - a.score)[0];
    const low = roster.slice().sort((a, b) => a.score - b.score)[0];
    cls.studentCount = roster.length;
    cls.high = high.score;
    cls.highName = high.name;
    cls.low = low.score;
    cls.lowName = low.name;
    cls.distribution = distributionFromStudents(roster);
  });
}

function classNameOf(seed, classId) {
  const cls = seed.classes.find((item) => item.id === classId);
  return cls ? cls.name : '';
}

function fillSchoolRanks(seed) {
  const desc = seed.students.slice().sort((a, b) => b.score - a.score);
  const asc = seed.students.slice().sort((a, b) => a.score - b.score);
  seed.school.personHigh = desc.slice(0, 8).map((student) => ({
    studentId: student.id,
    classId: student.classId,
    name: `${student.name} · ${classNameOf(seed, student.classId)}`,
    score: student.score,
  }));
  seed.school.personLow = asc.slice(0, 8).map((student) => ({
    studentId: student.id,
    classId: student.classId,
    name: `${student.name} · ${classNameOf(seed, student.classId)}`,
    score: student.score,
  }));
  seed.school.lowAttention = asc.slice(0, 8).map((student) => ({
    id: student.id,
    studentId: student.id,
    classId: student.classId,
    name: student.name,
    meta: `${classNameOf(seed, student.classId)} · 近 7 日 ${student.recentDelta > 0 ? '+' : ''}${student.recentDelta || 0} 分`,
    score: student.score,
  }));
  seed.school.classRank = seed.school.classRank.map((row) => {
    const cls = seed.classes.find((item) => item.name === row.name);
    return cls ? { ...row, id: cls.id } : row;
  });
}

function createSeed() {
  const students352 = [
    { id: 's-lin', name: '林晓', studentNo: '12', score: 96, classId: 'c352', recentDelta: 4 },
    { id: 's-zhou', name: '周子轩', studentNo: '03', score: 91, classId: 'c352', recentDelta: 2 },
    { id: 's-su', name: '苏晴', studentNo: '15', score: 88, classId: 'c352', recentDelta: 3 },
    { id: 's-chen1', name: '陈一诺', studentNo: '08', score: 86, classId: 'c352', recentDelta: 6, idNumber: '110101201801011234' },
    { id: 's-zhao', name: '赵雨', studentNo: '25', score: 12, classId: 'c352', recentDelta: -8 },
    { id: 's-wang', name: '王小明', studentNo: '21', score: -5, classId: 'c352', recentDelta: -12 },
    { id: 's-zhouqi', name: '周启', studentNo: '01', score: 98, classId: 'c351', recentDelta: 5 },
    { id: 's-linzhou', name: '林舟', studentNo: '06', score: 88, classId: 'c351', recentDelta: 3 },
    { id: 's-mali', name: '马丽', studentNo: '14', score: 81, classId: 'c351', recentDelta: 2 },
    { id: 's-chen2', name: '陈一然', studentNo: '09', score: 74, classId: 'c351', recentDelta: 1, idNumber: '110101201901011234' },
    { id: 's-zhengkai', name: '郑凯', studentNo: '16', score: 66, classId: 'c351', recentDelta: 1 },
    { id: 's-sunhao', name: '孙浩', studentNo: '20', score: 55, classId: 'c351', recentDelta: -1 },
    { id: 's-lina', name: '李娜', studentNo: '22', score: 33, classId: 'c351', recentDelta: -4 },
    { id: 's-wutong', name: '吴桐', studentNo: '18', score: 22, classId: 'c351', recentDelta: -6 },
    { id: 's-qianjin', name: '钱进', studentNo: '02', score: 90, classId: 'c443', recentDelta: 4 },
    { id: 's-wudi', name: '吴迪', studentNo: '04', score: 82, classId: 'c443', recentDelta: 2 },
    { id: 's-chenchen', name: '陈晨', studentNo: '10', score: 71, classId: 'c443', recentDelta: 1 },
    { id: 's-zhaolei', name: '赵磊', studentNo: '13', score: 58, classId: 'c443', recentDelta: -2 },
    { id: 's-zhoumin', name: '周敏', studentNo: '17', score: 47, classId: 'c443', recentDelta: -3 },
    { id: 's-sunqian', name: '孙倩', studentNo: '19', score: 28, classId: 'c443', recentDelta: -7 },
    { id: 's-lixiang', name: '李想', studentNo: '23', score: 9, classId: 'c443', recentDelta: -9 },
    { id: 's-liuke', name: '刘可', studentNo: '07', score: -8, classId: 'c443', recentDelta: -14 },
    { id: 's-hejia', name: '何佳', studentNo: '11', score: 94, classId: 'c551', recentDelta: 4 },
    { id: 's-linfeng', name: '林峰', studentNo: '05', score: 86, classId: 'c551', recentDelta: 3 },
    { id: 's-zhangyue', name: '张悦', studentNo: '08', score: 79, classId: 'c551', recentDelta: 2 },
    { id: 's-wanglei', name: '王磊', studentNo: '12', score: 70, classId: 'c551', recentDelta: 1 },
    { id: 's-liuyang', name: '刘洋', studentNo: '15', score: 61, classId: 'c551', recentDelta: 0 },
    { id: 's-chenjing', name: '陈静', studentNo: '21', score: 48, classId: 'c551', recentDelta: -2 },
    { id: 's-zhaoming', name: '赵明', studentNo: '24', score: 41, classId: 'c551', recentDelta: -3 },
    { id: 's-sunyue', name: '孙悦', studentNo: '26', score: 40, classId: 'c551', recentDelta: -5 },
    { id: 's-zhenghao', name: '郑好', studentNo: '03', score: 92, classId: 'c244', recentDelta: 4 },
    { id: 's-qiancheng', name: '钱程', studentNo: '06', score: 84, classId: 'c244', recentDelta: 2 },
    { id: 's-zhounan', name: '周楠', studentNo: '09', score: 73, classId: 'c244', recentDelta: 1 },
    { id: 's-wuqian', name: '吴倩', studentNo: '11', score: 62, classId: 'c244', recentDelta: 0 },
    { id: 's-sunlei', name: '孙磊', studentNo: '14', score: 51, classId: 'c244', recentDelta: -2 },
    { id: 's-liting', name: '李婷', studentNo: '18', score: 36, classId: 'c244', recentDelta: -4 },
    { id: 's-chenkai', name: '陈凯', studentNo: '20', score: 27, classId: 'c244', recentDelta: -6 },
    { id: 's-fengfan', name: '冯帆', studentNo: '25', score: 18, classId: 'c244', recentDelta: -8 },
  ];

  const logs = [
    { id: 'l1', studentId: 's-chen1', delta: 3, reason: '课堂助人为乐', when: '昨天 14:20', operatorName: '李老师', createdAt: '2026-09-29 14:20' },
    { id: 'l2', studentId: 's-chen1', delta: -2, reason: '课间追逐打闹', when: '09-28', operatorName: '李老师', createdAt: '2026-09-28 10:05' },
    { id: 'l3', studentId: 's-chen1', delta: 5, reason: '升旗仪式主持', when: '09-25', operatorName: '李老师', createdAt: '2026-09-25 08:30' },
    { id: 'l4', studentId: 's-chen1', delta: 4, reason: '值日优秀', when: '09-20', operatorName: '李老师', createdAt: '2026-09-20 16:40' },
    { id: 'l5', studentId: 's-chen2', delta: 2, reason: '积极回答问题', when: '昨天 09:10', operatorName: '张老师', createdAt: '2026-09-29 09:10' },
    { id: 'l6', studentId: 's-chen2', delta: -1, reason: '作业迟交', when: '09-27', operatorName: '张老师', createdAt: '2026-09-27 16:00' },
    { id: 'l7', studentId: 's-liuke', delta: -6, reason: '课堂违纪说话', when: '昨天 11:20', operatorName: '王老师', createdAt: '2026-09-29 11:20' },
    { id: 'l8', studentId: 's-wang', delta: -4, reason: '课间追逐打闹', when: '09-28', operatorName: '李老师', createdAt: '2026-09-28 15:10' },
    { id: 'l9', studentId: 's-lixiang', delta: -3, reason: '迟到未说明', when: '09-27', operatorName: '王老师', createdAt: '2026-09-27 08:12' },
    { id: 'l10', studentId: 's-zhao', delta: -2, reason: '作业未完成', when: '09-26', operatorName: '李老师', createdAt: '2026-09-26 16:30' },
    { id: 'l11', studentId: 's-fengfan', delta: -5, reason: '值日缺席', when: '09-25', operatorName: '赵老师', createdAt: '2026-09-25 17:00' },
    { id: 'l12', studentId: 's-wutong', delta: -3, reason: '课堂违纪', when: '09-24', operatorName: '张老师', createdAt: '2026-09-24 10:40' },
    { id: 'l13', studentId: 's-chenkai', delta: -2, reason: '作业迟交', when: '09-23', operatorName: '赵老师', createdAt: '2026-09-23 16:15' },
    { id: 'l14', studentId: 's-sunqian', delta: -4, reason: '课间追逐打闹', when: '09-22', operatorName: '王老师', createdAt: '2026-09-22 14:05' },
  ];

  const seed = {
    teacherMode: 'ready', // ready | empty
    currentClassId: 'c352',
    classes: [
      {
        id: 'c352',
        name: '352',
        teacherName: '李老师',
        studentCount: 42,
        avg: 72.4,
        todayChanges: 12,
        high: 96,
        highName: '林晓',
        low: -5,
        lowName: '王小明',
        distribution: [
          { label: '<0', count: 1, height: 10, low: true },
          { label: '0-40', count: 3, height: 16, low: true },
          { label: '41-60', count: 8, height: 28, low: false },
          { label: '61-80', count: 19, height: 52, low: false },
          { label: '81+', count: 11, height: 36, low: false },
        ],
      },
      {
        id: 'c351',
        name: '351',
        teacherName: '张老师',
        studentCount: 40,
        avg: 75.1,
        todayChanges: 8,
        high: 98,
        highName: '周启',
        low: 22,
        lowName: '吴桐',
        distribution: [],
      },
      {
        id: 'c443',
        name: '443',
        teacherName: '王老师',
        studentCount: 38,
        avg: 63.2,
        todayChanges: 15,
        high: 90,
        highName: '钱进',
        low: -8,
        lowName: '刘可',
        distribution: [],
      },
      {
        id: 'c551',
        name: '551',
        teacherName: '陈老师',
        studentCount: 41,
        avg: 78.6,
        todayChanges: 6,
        high: 94,
        highName: '何佳',
        low: 40,
        lowName: '孙悦',
        distribution: [],
      },
      {
        id: 'c244',
        name: '244',
        teacherName: '赵老师',
        studentCount: 39,
        avg: 71.0,
        todayChanges: 5,
        high: 92,
        highName: '郑好',
        low: 18,
        lowName: '冯帆',
        distribution: [],
      },
    ],
    students: students352,
    logs,
    parentBindings: ['s-chen1', 's-chen2'],
    selectedChildId: 's-chen1',
    school: {
      yearLabel: '2026 学年 · 秋',
      classCount: 18,
      studentCount: 756,
      avg: 71.8,
      high: 98,
      low: -8,
      todayChanges: 86,
      distribution: [
        { label: '<0', count: 12, height: 10, low: true },
        { label: '0-40', count: 28, height: 16, low: true },
        { label: '41-60', count: 134, height: 28, low: false },
        { label: '61-80', count: 392, height: 56, low: false },
        { label: '81+', count: 190, height: 38, low: false },
      ],
      classRank: [
        { name: '551', score: 78.6 },
        { name: '351', score: 75.1 },
        { name: '352', score: 72.4 },
        { name: '244', score: 71.0 },
        { name: '443', score: 63.2 },
      ],
      personHigh: [
        { name: '周启 · 351', score: 98 },
        { name: '林晓 · 352', score: 96 },
        { name: '何佳 · 551', score: 94 },
        { name: '周子轩 · 352', score: 91 },
      ],
      personLow: [
        { name: '刘可 · 443', score: -8 },
        { name: '王小明 · 352', score: -5 },
        { name: '赵雨 · 352', score: 12 },
      ],
      lowAttention: [
        { id: 's-liuke', name: '刘可', meta: '443 · 近 7 日 -14 分', score: -8 },
        { id: 's-wang', name: '王小明', meta: '352 · 近 7 日 -12 分', score: -5 },
      ],
    },
    reasonTags: ['助人为乐', '值日优秀', '拾金不昧', '迟到', '课堂违纪'],
  };
  applyNon352Stats(seed);
  fillSchoolRanks(seed);
  return seed;
}

let state = createSeed();

function getState() {
  return state;
}

function reseedReady() {
  state = createSeed();
  state.teacherMode = 'ready';
  state.currentClassId = 'c352';
}

function resetTeacherEmpty() {
  state = createSeed();
  state.teacherMode = 'empty';
  state.currentClassId = null;
  state.classes = state.classes.filter((c) => c.id !== 'c352');
  state.students = state.students.filter((s) => s.classId !== 'c352');
}

function getClass(classId) {
  return state.classes.find((c) => c.id === classId) || null;
}

function getCurrentTeacherClass() {
  if (!state.currentClassId) return null;
  return getClass(state.currentClassId);
}

function getStudentsByClass(classId) {
  return state.students.filter((s) => s.classId === classId);
}

function getStudent(id) {
  return state.students.find((s) => s.id === id) || null;
}

function getParentChildren() {
  return state.parentBindings.map((id) => getStudent(id)).filter(Boolean);
}

function getSelectedChild() {
  return getStudent(state.selectedChildId) || getParentChildren()[0] || null;
}

function setSelectedChild(id) {
  state.selectedChildId = id;
}

function getLogsForStudent(studentId) {
  return state.logs
    .filter((l) => l.studentId === studentId)
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

function bindChild(name, idNumber) {
  const found = state.students.find(
    (s) => s.name === name && (!s.idNumber || s.idNumber === idNumber || idNumber.includes('****'))
  );
  if (found) {
    if (!state.parentBindings.includes(found.id)) {
      state.parentBindings.push(found.id);
    }
    state.selectedChildId = found.id;
    return { ok: true, student: found };
  }
  const id = `s-bound-${Date.now()}`;
  const student = {
    id,
    name,
    studentNo: '--',
    score: 60,
    classId: 'c352',
    recentDelta: 0,
    idNumber,
  };
  state.students.push(student);
  state.parentBindings.push(id);
  state.selectedChildId = id;
  return { ok: true, student };
}

function createClass(name) {
  const id = `c-${name}`;
  const cls = {
    id,
    name,
    teacherName: '李老师',
    studentCount: 0,
    avg: 60,
    todayChanges: 0,
    high: 60,
    highName: '-',
    low: 60,
    lowName: '-',
    distribution: [
      { label: '<0', count: 0, height: 4, low: true },
      { label: '0-40', count: 0, height: 4, low: true },
      { label: '41-60', count: 0, height: 4, low: false },
      { label: '61-80', count: 0, height: 4, low: false },
      { label: '81+', count: 0, height: 4, low: false },
    ],
  };
  state.classes.unshift(cls);
  state.currentClassId = id;
  state.teacherMode = 'empty';
  return cls;
}

function seedRosterForCurrentClass() {
  const cls = getCurrentTeacherClass();
  if (!cls) return;
  // Restore design roster for demo if recreating 352; otherwise add sample kids
  if (cls.name === '352' || !state.students.some((s) => s.classId === cls.id)) {
    const seed = createSeed();
    const extras = seed.students.filter((s) => s.classId === 'c352').map((s) => ({
      ...s,
      classId: cls.id,
    }));
    state.students = state.students.filter((s) => s.classId !== cls.id).concat(extras);
    cls.studentCount = 42;
    cls.avg = 72.4;
    cls.todayChanges = 12;
    cls.high = 96;
    cls.highName = '林晓';
    cls.low = -5;
    cls.lowName = '王小明';
    cls.distribution = seed.classes[0].distribution;
  }
  state.teacherMode = 'ready';
}

function skipRoster() {
  const cls = getCurrentTeacherClass();
  if (cls) {
    cls.studentCount = 0;
  }
  state.teacherMode = 'ready';
}

function adjustScore(studentId, delta, reason) {
  const student = getStudent(studentId);
  if (!student) return { ok: false, message: '未找到学生' };
  if (!reason || reason.trim().length < 4) {
    return { ok: false, message: '事由至少 4 个字' };
  }
  // Keep one decimal place to avoid float drift
  student.score = Math.round((student.score + delta) * 10) / 10;
  student.recentDelta = Math.round(((student.recentDelta || 0) + delta) * 10) / 10;
  const now = new Date();
  const pad = (n) => `${n}`.padStart(2, '0');
  const createdAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  state.logs.unshift({
    id: `l-${Date.now()}`,
    studentId,
    delta,
    reason: reason.trim(),
    when: '刚刚',
    operatorName: '李老师',
    createdAt,
  });
  return { ok: true, student };
}

function getTeacherHomeStats() {
  const cls = getCurrentTeacherClass();
  if (!cls) return null;
  const students = getStudentsByClass(cls.id);
  const attention = students
    .slice()
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map((s) => ({
      id: s.id,
      name: s.name,
      score: s.score,
      meta: `近 7 日 ${s.recentDelta > 0 ? '+' : ''}${s.recentDelta} 分`,
    }));
  return {
    class: cls,
    attention,
    studentCount: students.length || cls.studentCount,
  };
}

function getClassBoard(classId) {
  const cls = getClass(classId) || getCurrentTeacherClass();
  if (!cls) return null;
  const students = getStudentsByClass(cls.id).slice().sort((a, b) => b.score - a.score);
  const low = students.slice().sort((a, b) => a.score - b.score);
  return {
    class: cls,
    highList: students.slice(0, 8),
    lowList: low.slice(0, 8),
    distribution: cls.distribution,
  };
}

module.exports = {
  clone,
  getState,
  reseedReady,
  resetTeacherEmpty,
  getClass,
  getCurrentTeacherClass,
  getStudentsByClass,
  getStudent,
  getParentChildren,
  getSelectedChild,
  setSelectedChild,
  getLogsForStudent,
  bindChild,
  createClass,
  seedRosterForCurrentClass,
  skipRoster,
  adjustScore,
  getTeacherHomeStats,
  getClassBoard,
};
