import { create } from 'zustand';
import { LoggedInUser } from '../../common/types';
import { LazyModel } from '../../common/models/LazyModel';
import { getLoggedInUser } from '../../common/services/auth-service';

export interface AuthStoreState {
  user: LazyModel<LoggedInUser>;
  loadUser: () => void;
}

export const useAuthStore = create<AuthStoreState>((setState) => ({
  user: {
    data: null,
    error: null,
    loading: false,
  },
  loadUser: () => {
    setState({ user: { loading: true, data: null, error: null } });
    getLoggedInUser()
      .catch((error) =>
        setState({ user: { error, data: null, loading: false } }),
      );
  },
}));
