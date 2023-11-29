import {createBrowserRouter} from "react-router-dom";
import {AppModules} from "../enums/AppModules";
import {DefaultLayout} from "../../layouts/default";
import {LoginPage} from "../../auth/login/LoginPage";
import {RegisterPage} from "../../auth/register/Register";
import {ResetPage} from "../../pages/resetPage";
import {ConfirmPage} from "../../pages/ConfirmPage";
import {ForgotPage} from "../../pages/forgotPage";
import React from "react";
// import PrivateRoutesUser from "../private-routes";
import {PrivateRoutesUser} from "../private-routes";
import {UserTestsPage} from "../../pages/UserTestsPage";
import {TestPreviewPage} from "../../pages/TestPreviewPage";
import ProfilePage from "../../pages/Profile";
import {TestEditPage} from "../../pages/TestEditPage";
import {TestPage} from "../../pages/TestPage";
import {HomePage} from "../../pages/HomePage";

export const useRouter = () => {
    const routerConfig = createBrowserRouter([
        {  path: AppModules.Login,    element: <LoginPage/>    },
        {  path: AppModules.Register, element: <RegisterPage/> },
        {  path: AppModules.Forgot,   element: <ForgotPage/>   },
        {  path: '/confirm/:userEmail/:token',  element: <ConfirmPage/> },
        {  path: '/reset/:userEmail/:token',  element: <ResetPage/>  },
        {
            path: '',
            element: <DefaultLayout/>,
            children: [
                {
                    index: true,
                    path: AppModules.Home,
                    element:
                            <HomePage />
                },
                {
                    path: AppModules.Profile,
                    element:(
                    <PrivateRoutesUser>
                            <ProfilePage />
                    </PrivateRoutesUser>
                    )
                },
                {
                    path: AppModules.Test,
                    element:(
                        <PrivateRoutesUser>
                            <TestPage/>
                        </ PrivateRoutesUser>),
                },

                {
                    path: AppModules.MyTests,
                    element:(
                        <PrivateRoutesUser>
                         <UserTestsPage/>
                        </ PrivateRoutesUser>),
                },

                {
                    path: '/test/:testId/preview',
                    element:(
                        <PrivateRoutesUser>
                            <TestPreviewPage/>
                        </ PrivateRoutesUser>),
                },

                {
                    path: '/test/:testId/edit',
                    element:(
                        <PrivateRoutesUser>
                            <TestEditPage/>
                        </ PrivateRoutesUser>),
                },
                {
                    path: '/test/:testId',
                    element:(
                        <PrivateRoutesUser>
                            <TestPage/>
                        </ PrivateRoutesUser>),
                },

            ],
        },

    ])
    return { routerConfig }
}
