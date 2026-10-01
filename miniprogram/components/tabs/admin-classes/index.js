const store = require('../../../data/demo-store');

Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: { active: { type: Boolean, value: false } },
  data: { classes: [] },
  observers: { active(v) { if (v) this.refresh(); } },
  lifetimes: { attached() { if (this.data.active) this.refresh(); } },
  methods: {
    refresh() { this.setData({ classes: store.getState().classes }); },
    openClass(e) {
      const id = e.currentTarget.dataset.id;
      store.getState().currentClassId = id;
      wx.navigateTo({ url: '/pages/teacher/board/index?preview=1' });
    },
  },
});
