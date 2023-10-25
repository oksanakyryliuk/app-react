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
import { BlankForm } from './BlankForm';
import { QuestionDto } from "../../../common/types";

interface QuestionFormProps {
    onSaveData: (formData: QuestionDto) => void;
    questionIndex: number;
}

export function QuestionFormBlank({ onSaveData, questionIndex }: QuestionFormProps) {
    const [formData, setFormData] = useState<QuestionDto>({
        type: 'blank',
        title: '',
        description: '',
        q_image: null,
        answers: [],
    });

    const [showBlanks, setShowBlanks] = useState(false);

    // Функція для зміни даних питання
    const handleQuestionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, title: value }));

        createJSON();
    };

    // Функція для зміни опису
    const handleDescriptionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, description: value }));

        createJSON();
    };

    // Функція для створення JSON-об'єкта зі зібраними даними
    const createJSON = () => {
        onSaveData(formData);
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
                            <ImageUploadForm id={`blank-id-${questionIndex}`} onFileUpload={(image) => {
                                setFormData((prevData) => ({ ...prevData, q_image: image }));
                                createJSON();
                            }} />
                        </Stack>
                    </Stack>
                    {!showBlanks ? (
                        <Container>
                            <Container sx={{ margin: '32px' }}>
                                <TextField
                                    variant="standard"
                                    multiline
                                    maxRows={4}
                                    placeholder="Введіть запитання, наприклад, 'В добу [палеоліту] з'явились перші поселення на території України.'"
                                    helperText="Запитання"
                                    value={formData.title}
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
                            setShowBlanks={() => setShowBlanks(false)}
                            formData={formData}
                            onFormDataChange={(newFormData) => {
                                setFormData(newFormData);
                                createJSON();
                            }}
                        />
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}
