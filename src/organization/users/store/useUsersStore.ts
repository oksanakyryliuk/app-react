import { LazyModel } from '../../../common/models/LazyModel';
import { User } from '../../../common/types';
import { create } from 'zustand';
import { getUsers } from '../../../common/services/users-service';

export interface UsersStoreState {
  users: LazyModel<User[]>;
  fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersStoreState>((setState) => ({
  users: {
    data: [],
    loading: false,
    error: null,
  },
  fetchUsers: async () => {
    try {
      setState({ users: { data: [], loading: true, error: null } });
      const data = await getUsers();
      setState({ users: { data: data, loading: false, error: null } });
    } catch (error) {
      setState({ users: { data: [], loading: false, error } });
    }
  },
}));
