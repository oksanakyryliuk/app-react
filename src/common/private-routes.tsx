import { Navigate, Outlet } from 'react-router-dom';
import { AppModules } from '../common/enums/AppModules';
import { useAuth } from '../auth/hooks/useAuth';

export const PrivateRoutesAdmin = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  console.log(isAdmin)
  return isLoggedIn &&isAdmin ? <Outlet /> : <Navigate to={AppModules.Admin} />;
};

export const PrivateRoutesUser = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  console.log(isAdmin)
  return isLoggedIn &&isAdmin ? <Outlet /> : <Navigate to={AppModules.User} />;
};
export const PrivateRoutesModerator = () => {
  const { isLoggedIn, isModerator } = useAuth();
  console.log(isModerator)
  return isLoggedIn &&isModerator ? <Outlet /> : <Navigate to={AppModules.Moderator} />;
};