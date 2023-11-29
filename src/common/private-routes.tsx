import { Navigate, Outlet } from 'react-router-dom';
import { AppModules } from '../common/enums/AppModules';
import { useAuth } from '../auth/hooks/useAuth';

export const PrivateRoutesAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  return isLoggedIn &&isAdmin ? <Outlet /> : <Navigate to={AppModules.Home} />;
};

export const PrivateRoutesUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isUser } = useAuth();
  return isLoggedIn && isUser ? <>{children}</> : <Navigate to={AppModules.Home} />;
};