const store = require('../../../data/demo-store');

Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: {
    active: { type: Boolean, value: false },
  },
  data: {
    children: [],
    selectedId: '',
    child: null,
    className: '',
    termDelta: 0,
    rank: '#4',
    recent: [],
  },
  observers: {
    active(v) {
      if (v) this.refresh();
    },
  },
  lifetimes: {
    attached() {
      if (this.data.active) this.refresh();
    },
  },
  methods: {
    refresh() {
      const children = store.getParentChildren();
      const child = store.getSelectedChild() || children[0];
      if (!child) {
        this.setData({ children: [], child: null, recent: [] });
        return;
      }
      store.setSelectedChild(child.id);
      const cls = store.getClass(child.classId);
      const logs = store.getLogsForStudent(child.id).slice(0, 3);
      const termDelta = child.score - 60;
      this.setData({
        children,
        selectedId: child.id,
        child,
        className: (cls && cls.name) || '',
        termDelta: termDelta > 0 ? `+${termDelta}` : `${termDelta}`,
        rank: child.id === 's-chen1' ? '#4' : '#12',
        recent: logs,
      });
    },
    selectChild(e) {
      const id = e.currentTarget.dataset.id;
      if (id === 'bind') {
        this.triggerEvent('switchtab', { key: 'bind' });
        return;
      }
      store.setSelectedChild(id);
      this.refresh();
    },
    openTimeline() {
      wx.navigateTo({ url: '/pages/parent/timeline/index' });
    },
  },
});
