const store = require('../../../data/demo-store');

Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: { active: { type: Boolean, value: false } },
  data: { school: {}, lowAttention: [], classes: [] },
  observers: { active(v) { if (v) this.refresh(); } },
  lifetimes: { attached() { if (this.data.active) this.refresh(); } },
  methods: {
    refresh() {
      const state = store.getState();
      this.setData({
        school: state.school,
        lowAttention: state.school.lowAttention,
        classes: state.classes.slice(0, 5),
      });
    },
    openClass(e) {
      const id = e.currentTarget.dataset.id;
      store.getState().currentClassId = id;
      wx.navigateTo({ url: '/pages/teacher/board/index?preview=1' });
    },
    goClasses() { this.triggerEvent('switchtab', { key: 'classes' }); },
  },
});
