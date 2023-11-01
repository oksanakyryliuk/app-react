import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {muiDarkTheme} from "./config/theme"
import { AppModules } from './enums/AppModules';
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

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          <Route path={AppModules.Home} element={<HomePage />} />

          {/*<Route element={<PrivateRoutes />}>*/}
          {/*  <Route path={AppModules.Main} element={<MainLayout />}>*/}
          {/*</Route>*/}
            <Route path='/reset/:userEmail/:token' element={<ResetPage/>} />
            <Route path={AppModules.Forgot} element={<ForgotPage/>} />
            <Route path={AppModules.Category} element={<CategoryPage />} />
            <Route path='/test/:testId' element={<TestPage />} />
            <Route path='/test/:testId/preview' element={<TestPreviewPage />} />
            <Route path='/test/:testId/edit' element={<TestEditPage />} />
            <Route path={AppModules.Test} element={<GeneralTestsPage />} />
            <Route path='/my-tests' element={<UserTestsPage />} />
          <Route path={AppModules.Login} element={<LoginPage />} />
            <Route path={AppModules.Register} element={<RegisterPage />} />
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
