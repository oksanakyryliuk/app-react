import TrainingForm, { TrainingModelForm } from './components/TrainingForm';
import { useParams } from 'react-router-dom';
import { useTrainingsStore } from './store/useTrainingsStore';

export const emptyTrainingModel: TrainingModelForm = {
  duration: 0,
  maxPeople: 0,
  name: '',
  price: 0,
};

export const CreateTraining = () => {
  const { organizationId } = useParams();
  const { createTraining } = useTrainingsStore();
  const onSubmit = (data: TrainingModelForm) => {
    if (organizationId) {
      createTraining({
        ...data,
        organizationId: +organizationId,
      });
    }
  };
  return <TrainingForm initialData={emptyTrainingModel} onSubmit={onSubmit} />;
};
