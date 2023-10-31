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
    Stack
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from "../../../../common/icons/plus.png";
import { ImageUploadForm } from "../ImageUpload/ImageUploadForm";
import { Radio } from "evergreen-ui";
import {FileDTO, QuestionDto} from '../../../../common/types';

type QuestionType = 'single' | 'multiple';

interface QuestionFormCommonProps {
    type: QuestionType;
    onSaveData: (formData: QuestionDto) => void;
    questionIndex: number;
    questionDto? : QuestionDto;
}

export function QuestionFormSingleMultiple({ type, onSaveData, questionIndex, questionDto }: QuestionFormCommonProps) {
    const [formData, setFormData] = useState<QuestionDto>(questionDto || {
        type: type,
        title: '',
        description: '',
        q_image: null,
        answers: [{ text: '', a_image: null, isCorrect: false, isStrictText: false }],
    });

    // Функція для зміни даних питання
    const handleQuestionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, title: value }));

        onSaveData(formData);
    };

    // Функція для зміни опису
    const handleDescriptionChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, description: value }));

        onSaveData(formData);
    };

    // Функція для зміни тексту відповіді та чи вона правильна
    const handleOptionChange = (index: number, text: string, isCorrect: boolean, isStrictText: boolean, a_image: FileDTO | null) => {
        const updatedOptions = [...formData.answers];
        updatedOptions[index] = { text, isCorrect, isStrictText, a_image };
        setFormData((prevData) => ({ ...prevData, answers: updatedOptions }));

        onSaveData(formData);
    };

    // Функція для додавання нової відповіді
    const addOption = () => {
        setFormData((prevData) => ({
            ...prevData,
            answers: [
                ...prevData.answers,
                { text: '', isCorrect: false, isStrictText: false, a_image: null }
            ]
        }));
    };

    // Функція для видалення відповіді за індексом
    const removeOption = (index: number) => {
        const newOptions = [...formData.answers];
        newOptions.splice(index, 1);
        setFormData((prevData) => ({ ...prevData, answers: newOptions }));

        onSaveData(formData);
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
                            <ImageUploadForm id= {`imageUpload-${type}-${questionIndex}-${Math.random()}`} onFileUpload={(image) => {
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
                            value={formData.title}
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

                        {formData.answers.map((option, index) => (
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
                                                        name={`correct-${questionIndex}`}
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
                                    <ImageUploadForm id={`imageUploadAnswer-${index}-forQuestion-${questionIndex}-${Math.random()}`} onFileUpload={(a_image) => {
                                        const updatedOptions = [...formData.answers];
                                        updatedOptions[index] = { ...updatedOptions[index], a_image };
                                        setFormData((prevData) => ({ ...prevData, answers: updatedOptions }));
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
            </Card>
        </Container>
    );
}
