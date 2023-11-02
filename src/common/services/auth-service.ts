import {
  AuthResponse,
  LoggedInUser,
  LoginDTO,
  User,
  RegisterDTO,
  ResetPasswordDTO,
  ForgotPasswordDTO,
  ConfirmEmailDTO
} from '../types';
import { httpClient } from '../http-client';


export function apiLogin(data: LoginDTO)  {
  return httpClient<AuthResponse>({
    method: 'post',
    url: 'Auth/login',
    data,
  })
      .then((response) => {
        // Log the entire response
        console.log('Response from apiLogin:', response);

        // Return the response data, or process it as needed
        return response.data;
      });
// .then( ({ data }) => { data });
}


export function apiRegister(data: RegisterDTO) {
  return httpClient<any>({
    method: 'post',
    url: 'Auth/register',
    data,
  }).then(({ data }) => data);
}

export function apiResetPassword(data: ResetPasswordDTO) {
  return httpClient<any>({
    method: 'post',
    url: 'Auth/reset-password',
    data,
  }).then(({ data }) => data);
}

export function apiConfirmEmail(data: ConfirmEmailDTO) {
  return httpClient<any>({
    method: 'patch',
    url: 'Auth/verify',
    data,
  }).then(({ data }) => data);
}


export function apiForgotPassword(data: ForgotPasswordDTO) {
  return httpClient<any>({
    method: 'post',
    url: 'Auth/forgot-password',
    params: data,
  }).then(({ data }) => data);
}




export function getLoggedInUser() {
  return httpClient<User>({
    method: 'get',
    url: `/api/Auth`,
  }).then(({ data }) => data);
}
