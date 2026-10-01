Component({
  properties: {
    name: { type: String, value: '' },
    meta: String,
    score: Number,
    tone: { type: String, value: '' },
    showHl: { type: Boolean, value: false },
    high: Number,
    low: Number,
  },
  observers: {
    name(name) {
      this.setData({ initial: name ? name[0] : '' });
    },
  },
  data: {
    initial: '',
  },
  methods: {
    onTap() {
      this.triggerEvent('tap');
    },
  },
});
