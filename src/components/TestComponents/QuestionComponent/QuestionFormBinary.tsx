import React, {useState} from 'react';
import {
    Card,
    CardContent,
    Container,
    InputAdornment,
    InputLabel,
    Stack,
    TextField,
} from '@mui/material';
import {ImageUploadForm} from "../MainForm/ImageUpload/ImageUploadForm";
import {QuestionDto} from "../../../common/types";
import {Radio} from "evergreen-ui";

interface QuestionFormProps {
    onSaveData: (formData: QuestionDto) => void;
    questionIndex: number;
}

export function QuestionFormBinary({ onSaveData, questionIndex }: QuestionFormProps) {
    const [formData, setFormData] = useState<QuestionDto>({
        type: "binary",
        title: '',
        description: '',
        q_image: null,
        answers: [
            { text: '', a_image: null, isCorrect: false, isStrictText: false },
            { text: '', a_image: null, isCorrect: false, isStrictText: false },
        ],
    });

    const [options, setOptions] = React.useState([
        { text: 'Правда', isCorrect: false, isStrictText: false, a_image: null },
        { text: 'Брехня', isCorrect: false, isStrictText: false, a_image: null },
    ]);

    const handleRadioChange = (index: number) => {
        const updatedOptions = options.map((option, i) => ({
            ...option,
            isCorrect: i === index,
        }));

        setOptions(updatedOptions);
        formData.answers = updatedOptions;
        setFormData((prevData) => ({
            ...prevData,
            answers: updatedOptions,
        }));

        onSaveData(formData);
    };

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

    return (
        <Container sx={{marginBlock:"16px"}}>
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
                            placeholder="Правда / Брехня"
                            helperText="Тип запитання"
                            disabled
                        />
                        <Stack>
                            <ImageUploadForm id={`binary-id-${questionIndex}-${Math.random()}`} onFileUpload={(image) => {
                                setFormData((prevData) => ({ ...prevData, q_image: image }));
                                onSaveData(formData);
                            }} />
                        </Stack>
                    </Stack>
                    <Container sx={{ margin: '32px' }}>
                        <TextField
                            variant="standard"
                            multiline
                            maxRows={4}
                            placeholder="Введіть запитання, наприклад, 'Правда чи брехня: Перші поселення на території України з'явились в добу каменю.'"
                            helperText="Запитання"
                            value={formData.title}
                            onChange={(e) => handleQuestionChange(e.target.value)}
                            sx={{ width: "80%", marginInline: "24px" }}
                        />
                    </Container>
                    <Container sx={{ margin: '32px' }}>
                        <TextField
                            variant="standard"
                            multiline
                            maxRows={4}
                            placeholder="Додайте коментарі, наприклад, 'Виберіть правда або брехня.'    (опціонально)"
                            helperText="Опис"
                            value={formData.description}
                            onChange={(e) => handleDescriptionChange(e.target.value)}
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
                                                <Radio
                                                    name={`correct-${questionIndex}`}
                                                    checked={option.isCorrect}
                                                    onChange={() => handleRadioChange(index)}
                                                />
                                                <InputLabel sx={{ margin: '1rem' }}>Правильна</InputLabel>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Container>
                        ))}
                    </Container>
                </CardContent>
            </Card>
        </Container>
    );
}
