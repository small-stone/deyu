Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: {
    role: { type: String, value: 'parent' },
    active: { type: String, value: 'home' },
  },
  methods: {
    onTap(e) {
      const key = e.currentTarget.dataset.key;
      if (!key || key === this.data.active) return;
      // In-page tab switch only — never navigate
      this.triggerEvent('change', { key });
    },
  },
});
