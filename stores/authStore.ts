import { types } from 'mobx-state-tree';

export const authStore = types
  .model('AuthStore')
  .props({
    isLoggedIn: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    redirectToLogin: () => {
      if (!self.isLoggedIn) {
      }
    },
  }));
