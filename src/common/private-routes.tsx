import { Navigate, Outlet } from 'react-router-dom';
import { AppModules } from '../common/enums/AppModules';
import { useAuth } from '../auth/hooks/useAuth';

export const PrivateRoutesAdmin = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  console.log(isAdmin)

  return isLoggedIn &&isAdmin ? <Outlet /> : <Navigate to={AppModules.Home} />;
};

export const PrivateRoutesUser = () => {
  const { isLoggedIn, isUser } = useAuth();
  return isLoggedIn &&isUser ? <Outlet /> : <Navigate to={AppModules.Home} />;
};
