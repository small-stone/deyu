Component({
  properties: {
    role: { type: String, value: 'parent' },
    active: { type: String, value: 'home' },
  },
  methods: {
    onTap(e) {
      const key = e.currentTarget.dataset.key;
      const role = this.data.role;
      const map = {
        parent: {
          home: '/pages/parent/home/index',
          bind: '/pages/parent/bind/index',
          profile: '/pages/common/profile/index?role=parent',
        },
        teacher: {
          home: '/pages/teacher/home/index',
          students: '/pages/teacher/roster/index',
          board: '/pages/teacher/board/index',
          profile: '/pages/common/profile/index?role=teacher',
        },
        admin: {
          overview: '/pages/admin/overview/index',
          rank: '/pages/admin/rank/index',
          classes: '/pages/admin/classes/index',
          profile: '/pages/common/profile/index?role=admin',
        },
      };
      const url = map[role] && map[role][key];
      if (!url) return;
      if (key === this.data.active) return;
      wx.redirectTo({ url });
    },
  },
});
