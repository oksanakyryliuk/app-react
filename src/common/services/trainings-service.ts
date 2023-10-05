import { Training, TrainingDTO } from '../types';
import { httpClient } from '../http-client';

export const getTrainings = (organizationId: number): Promise<Training[]> => {
  return httpClient<Training[]>({
    method: 'get',
    url: 'api/training',
    params: { organizationId },
  }).then(({ data }) => data);
};

export const createTraining = (data: TrainingDTO) => {
  return httpClient({
    method: 'post',
    url: 'api/training',
    data,
  }).then(({ data }) => data);
};
