import React, {useState} from 'react';
import {
    Card,
    CardContent,
    Container,
    Checkbox,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Stack, Button,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from "../../../common/icons/plus.png";
import { ImageUploadForm } from "../MainForm/ImageUpload/ImageUploadForm";
import { Radio } from "evergreen-ui";
import { QuestionDto } from '../../../common/types';

type QuestionType = 'single' | 'multiple';

interface QuestionFormCommonProps {
    type: QuestionType;
}

export function QuestionFormSingleMultiple({ type }: QuestionFormCommonProps) {
    const [formData, setFormData] = useState<QuestionDto>({
        type: type,
        question: '',
        description: '',
        q_image: null,
        options: [{ text: '', a_image: null, isCorrect: false, isStrictText: false }],
    });

    // Функція для зміни даних питання
    const handleQuestionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, question: value }));
    };

    // Функція для зміни опису
    const handleDescriptionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, description: value }));
    };

    // Функція для зміни тексту відповіді та чи вона правильна
    const handleOptionChange = (index: number, text: string, isCorrect: boolean, isStrictText: boolean, a_image: File | null) => {
        const updatedOptions = [...formData.options];
        updatedOptions[index] = { text, isCorrect, isStrictText, a_image };
        setFormData((prevData) => ({ ...prevData, options: updatedOptions }));
    };

    // Функція для додавання нової відповіді
    const addOption = () => {
        const newOptions = [...formData.options, { text: '', isCorrect: false, isStrictText: false, a_image: null }];
        setFormData((prevData) => ({ ...prevData, options: newOptions }));
    };

    // Функція для видалення відповіді за індексом
    const removeOption = (index: number) => {
        const newOptions = [...formData.options];
        newOptions.splice(index, 1);
        setFormData((prevData) => ({ ...prevData, options: newOptions }));
    };

    // Функція для створення JSON-об'єкта зі зібраними даними
    const createJSON = () => {
        console.log(formData); // Виведе JSON-об'єкт у консоль
    };

    return (
        <Container sx={{ marginBlock: "16px" }}>
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
                            placeholder={type === 'single' ? 'Єдиний вибір' : 'Множинний вибір'}
                            helperText="Тип запитання"
                            disabled
                        />
                        <Stack>
                            <ImageUploadForm onFileUpload={(image) => {
                                setFormData((prevData) => ({ ...prevData, q_image: image }));
                            }} />
                        </Stack>
                    </Stack>

                    <Container sx={{ margin: '32px' }}>
                        <TextField
                            variant="standard"
                            multiline
                            maxRows={4}
                            placeholder="Введіть запитання, наприклад, 'Яка цивілізація існувала на території України в добу бронзи?'"
                            helperText="Запитання"
                            value={formData.question}
                            onChange={(e) => handleQuestionChange(e.target.value)}
                            sx={{ width: "80%", marginInline: "24px" }}
                        />

                        <TextField
                            variant="standard"
                            multiline
                            maxRows={4}
                            placeholder={`Додайте коментарі, наприклад, 'Питання потребує ${
                                type === 'single' ? 'однієї' : 'більше'
                            } правильної відповіді.' (опціонально)`}
                            helperText="Опис"
                            value={formData.description}
                            onChange={(e) => handleDescriptionChange(e.target.value)}
                            sx={{ width: "80%", marginInline: "24px" }}
                        />

                        {formData.options.map((option, index) => (
                            <Container key={index}>
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(index, e.target.value, option.isCorrect, false, option.a_image)}
                                    placeholder="Додайте варіант відповіді"
                                    multiline
                                    maxRows={4}
                                    sx={{ width: "60%", marginBottom: "1rem" }}
                                    helperText={`Відповідь №${index + 1}`}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {type === 'single' ? (
                                                    <Radio
                                                        name="correct"
                                                        checked={option.isCorrect}
                                                        onChange={(e) => handleOptionChange(index, option.text, e.target.checked, false, option.a_image)}
                                                    />
                                                ) : (
                                                    <Checkbox
                                                        size="small"
                                                        checked={option.isCorrect}
                                                        onChange={(e) => handleOptionChange(index, option.text, e.target.checked, false, option.a_image)}
                                                    />
                                                )}
                                                <InputLabel sx={{ margin: '1rem' }}>Правильна</InputLabel>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Stack sx={{ display: 'inline-flex' }}>
                                    <ImageUploadForm onFileUpload={(a_image) => {
                                        const updatedOptions = [...formData.options];
                                        updatedOptions[index] = { ...updatedOptions[index], a_image };
                                        setFormData((prevData) => ({ ...prevData, options: updatedOptions }));
                                    }} />
                                </Stack>
                                <IconButton onClick={() => removeOption(index)}>
                                    <DeleteForeverIcon color="error" />
                                </IconButton>
                            </Container>
                        ))}
                    </Container>
                    <IconButton
                        onClick={addOption}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '18px',
                            ml: 'auto',
                        }}
                    >
                        <img src={AddIcon} alt="AddIcon" />
                    </IconButton>
                </CardContent>
                <Button onClick={createJSON}>Зберегти</Button>
            </Card>
        </Container>
    );
}
