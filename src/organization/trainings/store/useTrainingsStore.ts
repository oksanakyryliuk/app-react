import { create } from 'zustand';
import { Training, TrainingDTO } from '../../../common/types';
import { LazyModel } from '../../../common/models/LazyModel';
import {
  createTraining,
  getTrainings,
} from '../../../common/services/trainings-service';

export interface TrainingsStoreState {
  trainings: LazyModel<Training[]>;
  fetchTrainings: (organizationId: number) => Promise<void>;
  createTraining: (data: TrainingDTO) => Promise<void>;
}

export const useTrainingsStore = create<TrainingsStoreState>(
  (setState, getState) => ({
    trainings: {
      data: null,
      loading: false,
      error: null,
    },
    fetchTrainings: async (organizationId: number) => {
      setState({ trainings: { data: [], loading: true, error: null } });
      try {
        const data = await getTrainings(organizationId);
        setState({ trainings: { data, loading: false, error: null } });
      } catch (error) {
        setState({ trainings: { data: null, error, loading: false } });
      }
    },
    createTraining: async (data) => {
      try {
        await createTraining(data);
        const { fetchTrainings } = getState();
        await fetchTrainings(data.organizationId);
      } catch (error) {
        console.error(error);
      }
    },
  }),
);
