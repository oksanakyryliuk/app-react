import React, { useState, useEffect } from 'react';
import QuestionTypeSelect from './QustionTypeSelect';
import { apiGetQuestionTypes } from '../../../common/services/question-service';
import {
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Checkbox,
    Stack,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from "../../../common/icons/plus.png";
import { ImageUploadForm } from "./ImageUploadForm";

export function QuestionForm() {
    const [questionTypes, setQuestionTypes] = useState<{ id: number, type: string }[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', isCorrect: false }]);

    useEffect(() => {
        apiGetQuestionTypes()
            .then((response) => {
                setQuestionTypes(response);
            })
            .catch((error) => {
                console.error('An error while getting question types: ', error);
            });
    }, []);

    const addOption = () => {
        setOptions([...options, { text: '', isCorrect: false }]);
    };

    const removeOption = (index: number) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    return (
        <Card>
            <CardContent>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        marginBottom: '48px',
                        paddingLeft: '28px',
                    }}
                >
                    <QuestionTypeSelect
                        value={selectedValue}
                        questionTypeList={questionTypes}
                        onChange={(selectedType) => {
                            setSelectedValue(selectedType);
                            // Операції з вибраними типами запитань
                            console.log(selectedType);
                        }}
                    />
                    <Stack sx={{ display: 'inline-flex' }}>
                        <ImageUploadForm />
                    </Stack>
                </Stack>
                <Container sx={{ margin: '32px' }}>
                    <TextField
                        variant="standard"
                        multiline
                        maxRows={4}
                        placeholder="Введіть запитання, наприклад, 'Яка цивілізація існувала на території України в добу бронзи?'"
                        helperText="Запитання"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        sx={{ width: "80%", marginInline: "24px" }}
                    />
                </Container>
                <Container sx={{ margin: '32px' }}>
                    <TextField
                        variant="standard"
                        multiline
                        maxRows={4}
                        placeholder="Додайте коментарі, наприклад, 'Питання потребує однієї правильної відповіді.'"
                        helperText="Опис"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        sx={{ width: "80%", marginInline: "24px" }}
                    />
                </Container>
                <Container sx={{ margin: '32px' }}>
                    <InputLabel sx={{ marginBlock: '1rem' }}>Відповіді:</InputLabel>
                    {options.map((option, index) => (
                        <Container key={index}>
                            <TextField
                                variant="standard"
                                fullWidth
                                value={option.text}
                                placeholder="Додайте варіант відповіді"
                                multiline
                                maxRows={4}
                                sx={{ width: "60%", marginBottom: "1rem" }}
                                helperText={`Відповідь №${index + 1}`}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Checkbox
                                                // checked={option.isCorrect}
                                                // onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                                            />
                                            <InputLabel sx={{ marginBlock: '1rem' }}>Правильна</InputLabel>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Stack sx={{ display: 'inline-flex' }}>
                                <ImageUploadForm />
                            </Stack>
                            <IconButton onClick={() => removeOption(index)}>
                                <DeleteForeverIcon color="error" />
                            </IconButton>
                        </Container>
                    ))}
                </Container>
                <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={addOption}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '18px',
                        ml: 'auto',
                    }}
                    startIcon={<img src={AddIcon} alt="AddIcon" width="20px" />}
                >
                    Додати відповідь
                </Button>
            </CardContent>
        </Card>
    );
}
