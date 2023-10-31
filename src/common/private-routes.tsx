import { Navigate, Outlet } from 'react-router-dom';
import { AppModules } from './../enums/AppModules';
import { useAuth } from '../auth/hooks/useAuth';

export const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to={AppModules.Login} />;
};
