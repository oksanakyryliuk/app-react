import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';
import { TrainingDTO } from '../../../common/types';

export type TrainingModelForm = Omit<TrainingDTO, 'organizationId'>;

interface FormProps {
  initialData: TrainingModelForm;
  onSubmit: (data: TrainingModelForm) => void;
}

const TrainingForm: React.FC<FormProps> = ({ initialData, onSubmit }) => {
  const { handleSubmit, register } = useForm<TrainingModelForm>({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: TrainingModelForm) => {
    onSubmit({
      ...data,
      duration: +data.duration,
      maxPeople: +data.maxPeople,
      price: +data.price,
    });
  };

  return (
    <Stack
      direction="column"
      spacing={3}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField label="Name" {...register('name')} required />

      <TextField
        label="Duration"
        type="number"
        {...register('duration', { min: 1 })}
        required
      />

      <TextField
        label="Max People"
        type="number"
        {...register('maxPeople', { min: 1 })}
        required
      />

      <TextField
        label="Price"
        type="number"
        {...register('price', { min: 1 })}
        required
      />

      <Button type="submit">Save</Button>
    </Stack>
  );
};

export default TrainingForm;
