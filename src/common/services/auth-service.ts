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

export function apiDeleteUsers(userId: number) {
  return httpClient({
    method: 'delete',
    url: `Auth/DeleteUser/${userId}`, // Use the appropriate URL for deleting a specific category
  })
      .then((response) => {
        return response.data;
      });
}

export function apiGetUsers() {
  return httpClient<any>({
    method: 'get',
    url: 'Auth/GetUsers'
  }).then(({ data }) => data);
}



export function apiForgotPassword(data: ForgotPasswordDTO) {
  return httpClient<any>({
    method: 'post',
    url: 'Auth/forgot-password',
    params: data,
  }).then(({ data }) => data);
}


export function getUser(email: any) {
  return httpClient<any>({
    method: 'get',
    url: `/Auth/user?email=${email}`,
    data: email
  }).then(({ data }) => data);
}

export function getLoggedInUser() {
  return httpClient<User>({
    method: 'get',
    url: `/Auth`,
  }).then(({ data }) => data);
}
