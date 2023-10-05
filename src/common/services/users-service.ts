import { User } from '../types';
import { httpClient } from '../http-client';

export const getUsers = (): Promise<User[]> => {
  return httpClient<User[]>({
    method: 'get',
    url: `/api/user`,
  }).then(({ data }) => data);
};

export const getUser = (userId: number): Promise<User> => {
  return httpClient<User>({
    method: 'get',
    url: `/api/user/${userId}`,
  }).then(({ data }) => data);
};
