import { StandardCrudLayout } from '../components/StandardCrudLayout';
import { useUsersStore } from './store/useUsersStore';
import { useEffect } from 'react';

export const UsersPage = () => {
  const { users, fetchUsers } = useUsersStore();
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <StandardCrudLayout
      error={users.error}
      loading={users.loading}
      items={{
        data: users?.data?.map(({ id, name}) => ({
          id,
          name: `${name} `,
        })),
        loading: users.loading,
        error: users.error,
      }}
    />
  );
};
