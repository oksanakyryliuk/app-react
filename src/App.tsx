import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {muiDarkTheme} from "./common/config/theme"
import {PrivateRoutesAdmin, PrivateRoutesUser} from './common/private-routes';
import { AppModules } from './common/enums/AppModules';
import { LoginPage } from './auth/login/LoginPage';
import { HomePage } from './home/HomePage';
import { RegisterPage } from "./auth/register/Register";
import {CategoryPage} from "./pages/Category";
import {TestPage} from "./pages/TestPage";
import {GeneralTestsPage} from "./pages/GeneralTestsPage";
import {ResetPage} from "./pages/resetPage";
import {ForgotPage} from "./pages/forgotPage";
import { ToastContainer } from "react-toastify";
import {TestPreviewPage} from "./pages/TestPreviewPage";
import {TestEditPage} from "./pages/TestEditPage";
import {UserTestsPage} from "./pages/UserTestsPage";
import {ConfirmPage} from "./pages/ConfirmPage";
import {UsersPage} from "./pages/Users";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          <Route path={AppModules.Home} element={<HomePage />} />

          <Route element={<PrivateRoutesAdmin />}>
              <Route path={AppModules.Category} element={<CategoryPage />} />
              <Route path={AppModules.User} element={<UsersPage />} />
          </Route>

            <Route element={<PrivateRoutesUser />}>
                <Route path={AppModules.MyTests} element={<UserTestsPage />} />
                <Route path='/test/:testId/edit' element={<TestEditPage />} />
                <Route path='/test/:testId' element={<TestPage />} />
            </Route>

            <Route path={AppModules.Test} element={<GeneralTestsPage />} />
            <Route path='/test/:testId/preview' element={<TestPreviewPage />} />
            <Route path={AppModules.Login} element={<LoginPage />} />
            <Route path={AppModules.Register} element={<RegisterPage />} />
            <Route path='/reset/:userEmail/:token' element={<ResetPage/>} />
            <Route path='/confirm/:userEmail/:token' element={<ConfirmPage/>} />
            <Route path={AppModules.Forgot} element={<ForgotPage/>} />
        </>,
    ),
);

function App() {
  return (
      <ThemeProvider theme={muiDarkTheme}>
          <ToastContainer theme="colored"></ToastContainer>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
  );
}

export default App;
