import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {muiDarkTheme} from "./common/config/theme"
import { ToastContainer } from "react-toastify";
import {useRouter} from "./common/routes/router";

function App() {
    const { routerConfig} =useRouter()
  return (
      <ThemeProvider theme={muiDarkTheme}>
          <ToastContainer theme="colored"></ToastContainer>
        <CssBaseline />
        <RouterProvider router={routerConfig} />
      </ThemeProvider>
  );
}

export default App;
