Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
  },
  properties: {
    name: { type: String, value: '' },
    meta: String,
    score: Number,
    tone: { type: String, value: '' },
    showHl: { type: Boolean, value: false },
    high: Number,
    low: Number,
  },
  methods: {
    onTap() {
      this.triggerEvent('tap');
    },
  },
});
