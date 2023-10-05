import { useParams } from 'react-router-dom';
// import UserForm from './components/UserForm';
import { useEffect, useState } from 'react';
import { LazyModel } from '../../common/models/LazyModel';
import { User, UserDTO } from '../../common/types';
import { getUser } from '../../common/services/users-service';
import { LazySection } from '../../common/components/LazySection';

export const UserPage = () => {
  // const { userId } = useParams();
  // const [user, setUser] = useState<LazyModel<User>>({
  //   data: null,
  //   loading: false,
  //   error: null,
  // });
  //
  // useEffect(() => {
  //   if (userId) {
  //     setUser({ data: null, loading: true, error: null });
  //     getUser(+userId)
  //       .then((data) =>
  //         setUser({
  //           data,
  //           loading: false,
  //           error: null,
  //         }),
  //       )
  //       .catch((error) => setUser({ data: null, loading: false, error }));
  //   }
  // }, [userId]);
  //
  // const onSubmit = (user: UserDTO) => {};
  // const { data, loading, error } = user;
  //
  // return (
  //   <LazySection loading={loading} error={error}>
  //     <UserForm initialData={data} onSubmit={onSubmit} readOnly={true} />
  //   </LazySection>
  // );
};
