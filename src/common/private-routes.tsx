import { Navigate, Outlet } from 'react-router-dom';
import { AppModules } from './../enums/AppModules';
import { useAuth } from '../auth/hooks/useAuth';

export const PrivateRoutesAdmin = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  console.log(isAdmin)
  return isLoggedIn &&isAdmin ? <Outlet /> : <Navigate to={AppModules.Main} />;
};
