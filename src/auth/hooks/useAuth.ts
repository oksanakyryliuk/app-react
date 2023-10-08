import { LoginDTO, RegisterDTO, ServerError } from '../../common/types';
import {apiLogin, apiRegister} from '../../common/services/auth-service';
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
            console.log(data)
            apiRegister(data)
                .then(() => {
                    toast.success('Registered successfully')
                    console.log("register ")
                })
                .catch(({ response }: AxiosError<ServerError>) => {
                    toast.error(`Error message: ${response?.data.message}`);
                });
        };


  const logout = () => {
    setToken('');
    navigate(AppModules.Login);
  };

  return { login,registerUser, logout, isLoggedIn, token };
}

