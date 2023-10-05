import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {muiDarkTheme} from "./config/theme"
import { PrivateRoutes } from './common/private-routes';
import { AppModules } from './enums/AppModules';
import { LoginPage } from './auth/login/LoginPage';
import { HomePage } from './home/HomePage';
import { DashboardContent } from './organization/dashboard/DashboardContent';
import MainLayout from './common/components/MainLayout';
import OrganizationLayout from './organization/OrganizationLayout';
import { OrganizationsPage } from './organization/OrganizationsPage';
import { TrainingsPage } from './organization/trainings/TrainingsPage';
import { CreateTraining } from './organization/trainings/CreateTraining';
import { TrainingsIndex } from './organization/trainings/TrainingsIndex';
import { UsersPage } from './organization/users/UsersPage';
import { UserPage } from './organization/users/UserPage';
import { UsersIndex } from './organization/users/UsersIndex';
import { CreateUser } from './organization/users/CreateUser';
import { RegisterPage } from "./auth/register/Register";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          <Route path={AppModules.Home} element={<HomePage />} />
          <Route element={<PrivateRoutes />}>
            <Route path={AppModules.Main} element={<MainLayout />}>
              <Route path="" element={<OrganizationsPage />} />
              <Route path=":organizationId" element={<OrganizationLayout />}>
                <Route path="" element={<DashboardContent />} />
                <Route path="trainings" element={<TrainingsPage />}>
                  <Route path="" element={<TrainingsIndex />} />
                  <Route path="create" element={<CreateTraining />} />
                </Route>
                <Route path="users" element={<UsersPage />}>
                  <Route path="" element={<UsersIndex />} />
                  {/*<Route path=":userId" element={<UserPage />} />*/}
                  <Route path="create" element={<CreateUser />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path={AppModules.Login} element={<LoginPage />} />
            <Route path={AppModules.Register} element={<RegisterPage />} />
        </>,
    ),
);

function App() {
  return (
      <ThemeProvider theme={muiDarkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
  );
}

export default App;
