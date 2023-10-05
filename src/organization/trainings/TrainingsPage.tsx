import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTrainingsStore } from './store/useTrainingsStore';
import { StandardCrudLayout } from '../components/StandardCrudLayout';

export const TrainingsPage = () => {
  const { organizationId } = useParams();
  const { fetchTrainings, trainings } = useTrainingsStore();

  useEffect(() => {
    if (organizationId) {
      fetchTrainings(+organizationId);
    }
  }, [organizationId]);

  return (
    <StandardCrudLayout
      loading={trainings.loading}
      error={trainings.error}
      items={{
        data: trainings.data?.map(({ id, name }) => ({ id, name })),
        loading: trainings.loading,
        error: trainings.error,
      }}
    />
  );
};
