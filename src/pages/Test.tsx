import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography
} from '@mui/material';
import {FieldValues, useForm} from "react-hook-form";
import PublicIcon from '../common/icons/icon-public-test.png';
import PrivateIcon from '../common/icons/icon-private-test.png';
import EditIcon from '../common/icons/edit.png';
import CustomSwitch from "../common/components/CustomSwitch";
import {Category} from "../common/types";
import {apiGetCategories} from "../common/services/category-service";
import {CategoryForm} from "../components/TestComponents/ModalMain/CategoryForm";

export function TestPage() {

  const { testId } = useParams();
  const { register, formState: { isValid } } = useForm<FieldValues>();
  
  // State for form data
  const [Title, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>(['', '']); // Array for answers

  // Event handler for changing the question field
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  // Event handler for changing the answer field
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  // Event handler for submitting the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data and create an object to send to the server
    const requestData = {
      Title,
      Answers: answers.map((answer, index) => ({
        Text: answer,
        isCorrect: true, // You can customize this value as needed
        isStrictText: true, // You can customize this value as needed
      })),
    };

    // Send a POST request to the server to create a question
    try {
      const response = await fetch(`http://localhost:5243/api/Question/${testId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // If the request was successful, you can clear the form data
        setQuestion('');
        setAnswers(['', '']);
      } else {
        // Handle errors if the server returns an unsuccessful status
        console.error('Error while sending the request to the server');
      }
    } catch (error) {
      // Handle errors for network or other exceptions
      console.error('Error while sending the request:', error);
    }
  };

  return (
      <Box sx={{ padding: '64px', marginLeft: '128px', marginRight: '128px' }}>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{
              marginBottom: '48px'
            }}
        >
          <Typography variant="h4">Створити новий тест</Typography>
          <Button variant="contained" type="submit" color="success" disabled={!isValid}>
            Створити тест
          </Button>
        </Stack>
        <Stack
            component="form"
            flexDirection="column"
            alignContent="center"
            justifyContent="center"
            spacing={3}
            /*onSubmit={handleSubmit(onSubmit)}*/
        >
          <TextField
              variant="standard"
              placeholder="Введіть назву, наприклад, 'Історія України. Первісні часи'"
              /*value={moduleName}
              onChange={handleModuleNameChange}*/
              sx={{ width: "40%", marginBottom: "1rem" }}
              helperText="Назва"
          />
          <TextField
              variant="standard"
              placeholder="Додайте опис"
              multiline
              maxRows={4}
              /*value={moduleDescription}
              onChange={handleModuleDescriptionChange}*/
              sx={{ width: "40%", marginBottom: "1rem" }}
              helperText="Опис"
          />
        </Stack>
        <Stack
            sx={{
              direction:"row",
              alignItems:"center",
              justifyContent:"space-between",
              width: '100%',
              marginTop: '16px',
              marginBottom: '16px',
            }}
            direction="row"
        >
            <CategoryForm/>
            <CustomSwitch
              options={[
                {
                  label: "Публічний",
                  value: true,
                  imageIcon: <img src={PublicIcon} alt="Public" width="32" height="32" />,
                },
                {
                  label: "Приватний",
                  value: false,
                  imageIcon: <img src={PrivateIcon} alt="Private" width="32" height="32" />,
                },
              ]}
              onChange={(value) => {
                // Обробка зміни значення перемикача тут
                console.log("Значення перемикача:", value);
              }}
              size="small"
          />
        </Stack>
      </Box>
  );
}