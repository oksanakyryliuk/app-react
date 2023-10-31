// CategoryForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import {apiCreateCategory} from "../common/services/category-service";
import {useForm} from "react-hook-form";
import {CategoryDTO, LoginDTO} from "../common/types";
import {useAuth} from "../auth/hooks/useAuth";
import {Button, Container, Stack, TextField} from "@mui/material";


interface CategoryFormProps {
  createCategory: (data: CategoryDTO) => void; // Визначаємо тип пропу явно
}
function CategoryForm({ createCategory } : CategoryFormProps) {

  const { register, handleSubmit, formState: { isValid } } = useForm<CategoryDTO>();

  const onSubmit = (data: CategoryDTO) => {
    createCategory(data); // Викликаємо функцію для створення категорії та передаємо дані
  };

  return (
      <Container maxWidth="xs" sx={{height: '100%'}}>
        <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%'}}>
          <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                 onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Title" variant="outlined" autoFocus {...register('title', {required: true})}/>
            <Button variant="contained" type="submit" disabled={!isValid}>Create</Button>
          </Stack>
        </Stack>
      </Container>
  )
}

export default CategoryForm;