import {
    ConfirmEmailDTO,
    ForgotPasswordDTO,
    LoginDTO,
    RegisterDTO,
    ResetPasswordDTO,
    ServerError
} from '../../common/types';
import {
    apiConfirmEmail,
    apiForgotPassword,
    apiLogin,
    apiRegister,
    apiResetPassword
} from '../../common/services/auth-service';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppModules } from '../../common/enums/AppModules';
import { useLocalStorage } from 'usehooks-ts';
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

export const TOKEN_STORAGE_KEY = 'authData';

export function useAuth() {
  const [token, setToken] = useLocalStorage<string>(TOKEN_STORAGE_KEY, '');
  const navigate = useNavigate();
  const isLoggedIn = !!token;
    const decodeToken:any = token?jwt_decode(token):null;
    const isAdmin= decodeToken? ( decodeToken.Role !== 'Admin' ? false : true): null;
    const isUser=decodeToken?(decodeToken.Role==='User'?true:false):null;
    const email=decodeToken?(decodeToken.Email):null;

  const login = (data: LoginDTO) => {
    apiLogin(data)
        .then((response) => {
          if (typeof response === 'object') {
            setToken(response.token);
            navigate(AppModules.Home);
          } else {
            // Handle the case where the resolved value is not a string
            console.error('Unexpected token type:', typeof response);
          }
        })
        .catch(({ response }: AxiosError<ServerError>) => {
          console.log(response?.data.message);
            toast.error(`Error message: ${response?.data}`);
        });
  }


        const registerUser = (data: RegisterDTO) => {
            apiRegister(data)
                .then(() => {
                    toast.success('Registered successfully. Please check your email and verify your account')
                    console.log("register ")
                })
                .catch(({ response }: AxiosError<ServerError>) => {
                    toast.error(`Error message: ${response?.data.message}`);
                });
        };

    const resetPassword= (data: ResetPasswordDTO) => {
        console.log(data)
        apiResetPassword(data)
            .then(() => {
                toast.success('Reset password successfully')
                console.log("reset ")
            })
            .catch(({ response }: AxiosError<ServerError>) => {
                toast.error(`Error message: ${response?.data.message}`);
            });
    };

    const confirmEmail= (data: ConfirmEmailDTO) => {
        console.log(data)
        apiConfirmEmail(data)
            .then(() => {
                toast.success('Confirm email successfully')
                console.log("reset ")
            })
            .catch(({ response }: AxiosError<ServerError>) => {
                toast.error(`Error message: ${response?.data.message}`);
            });
    };


    const forgotPassword= (data: ForgotPasswordDTO) => {
        console.log(data)
        apiForgotPassword(data)
            .then(() => {
                toast.success('Sent link on email successfully')
                console.log("sent link ")
            })
            .catch(({ response }: AxiosError<ServerError>) => {
                console.log("error ")
                toast.error(`Error message: ${response?.data.message}`);
            });
    };

  const logout = () => {
    setToken('');
    navigate(AppModules.Login);
  };

  return { login, registerUser, logout, resetPassword, forgotPassword, isLoggedIn, token, isAdmin,
      isUser, confirmEmail, email
  };
}

