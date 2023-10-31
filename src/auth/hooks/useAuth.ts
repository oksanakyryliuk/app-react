import {ForgotPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO, ServerError} from '../../common/types';
import {apiForgotPassword, apiLogin, apiRegister, apiResetPassword} from '../../common/services/auth-service';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppModules } from '../../enums/AppModules';
import { useLocalStorage } from 'usehooks-ts';
import { toast } from 'react-toastify';
export const TOKEN_STORAGE_KEY = 'authData';

export function useAuth() {
  const [token, setToken] = useLocalStorage<string>(TOKEN_STORAGE_KEY, '');
  const navigate = useNavigate();
  const isLoggedIn = !!token;

  const login = (data: LoginDTO) => {
    apiLogin(data)
        .then((response) => {
          if (typeof response === 'object') {
            setToken(response.token);
            navigate(AppModules.Main);
          } else {
            // Handle the case where the resolved value is not a string
            console.error('Unexpected token type:', typeof response);
          }
        })
        .catch(({ response }: AxiosError<ServerError>) => {
          console.log(response?.data.message);
        });
  }


        const registerUser = (data: RegisterDTO) => {
            apiRegister(data)
                .then(() => {
                    toast.success('Registered successfully')
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

  return { login, registerUser, logout, resetPassword, forgotPassword, isLoggedIn, token };
}
