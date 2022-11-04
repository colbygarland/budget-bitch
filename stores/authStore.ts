import { Instance, types } from 'mobx-state-tree';

const User = types.model({
  id: types.identifier,
  name: types.string,
  email: types.string,
});
interface IUser extends Instance<typeof User> {}

export const AuthStore = types
  .model('AuthStore')
  .props({
    user: types.reference(User),
  })
  .actions((self) => ({
    setUser: (user: IUser) => {
      self.user = {
        email: user.email,
        id: user.id,
        name: user.name,
      };
    },
  }));
