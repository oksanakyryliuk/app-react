import React, { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Stack
} from '@mui/material';
import { ImageUploadForm } from '../MainForm/ImageUpload/ImageUploadForm';
import NextIcon from '../../../common/icons/right-arrow.png';
import { Alert } from 'evergreen-ui';
import { BlankForm } from './BlankForm';
import {QuestionDto} from "../../../common/types";

export function QuestionFormBlank() {
    const [formData, setFormData] = useState<QuestionDto>({
        type: 'blank',
        question: '',
        description: '',
        q_image: null,
        options: [],
    });

    const [showBlanks, setShowBlanks] = useState(false);

    // Функція для зміни даних питання
    const handleQuestionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, question: value }));
    };

    // Функція для зміни опису
    const handleDescriptionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, description: value }));
    };

    // Функція для створення JSON-об'єкта зі зібраними даними
    const createJSON = () => {
        //formData.question = formData.question.replace(/\[([^\]]+)\]/g, "___________");
        console.log(formData); // Виведе JSON-об'єкт у консоль
    };

    return (
        <Container sx={{ marginBlock: '16px' }}>
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
                        <TextField
                            variant="outlined"
                            placeholder="Заповнити пропуски"
                            helperText="Тип запитання"
                            disabled
                        />
                        <Stack>
                            <ImageUploadForm onFileUpload={(image) => {
                                setFormData((prevData) => ({ ...prevData, q_image: image }));
                            }} />
                        </Stack>
                    </Stack>
                    {!showBlanks ? (
                        <Container>
                            <Container>
                                <Alert
                                    intent="none"
                                    title="Напишіть відповідь у квадратних дужках, щоб створити пропуск."
                                    marginBottom={32}
                                    marginX="64px"
                                />
                            </Container>
                            <Container sx={{ margin: '32px' }}>
                                <TextField
                                    variant="standard"
                                    multiline
                                    maxRows={4}
                                    placeholder="Введіть запитання, наприклад, 'В добу [палеоліту] з'явились перші поселення на території України.'"
                                    helperText="Запитання"
                                    value={formData.question}
                                    onChange={(e) => handleQuestionChange(e.target.value)}
                                    sx={{ width: '80%', marginInline: '24px' }}
                                />
                            </Container>
                            <Container sx={{ margin: '32px' }}>
                                <TextField
                                    variant="standard"
                                    multiline
                                    maxRows={4}
                                    placeholder="Додайте коментарі, наприклад, 'Вставте одне слово на місці пропуску.'    (опціонально)"
                                    helperText="Опис"
                                    value={formData.description}
                                    onChange={(e) => handleDescriptionChange(e.target.value)}
                                    sx={{ width: '80%', marginInline: '24px' }}
                                />
                                <Button
                                    variant="contained"
                                    endIcon={<img src={NextIcon} alt="continue" />}
                                    size="small"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        margin: '18px',
                                        ml: 'auto',
                                    }}
                                    onClick={() => setShowBlanks(true)}
                                >
                                    Наступний крок
                                </Button>
                            </Container>
                        </Container>
                    ) : (
                        <BlankForm
                            question={formData.question}
                            setShowBlanks={() => setShowBlanks(false)}
                            options={formData.options}
                            onOptionsChange={(newOptions) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    options: newOptions,
                                }));
                            }}
                        />

                    )}
                </CardContent>
                <Button onClick={createJSON}>Зберегти</Button>
            </Card>
        </Container>
    );
}
