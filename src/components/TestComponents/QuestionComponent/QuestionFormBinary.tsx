import React, {useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Container,
    InputAdornment,
    InputLabel,
    Stack,
    TextField,
    //Radio
} from '@mui/material';
import {ImageUploadForm} from "../MainForm/ImageUpload/ImageUploadForm";
import {QuestionDto} from "../../../common/types";
import {Radio} from "evergreen-ui";

export function QuestionFormBinary() {
    const [formData, setFormData] = useState<QuestionDto>({
        type: "binary",
        question: '',
        description: '',
        q_image: null,
        options: [
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

        setOptions(updatedOptions); // Оновлюємо options
        formData.options = updatedOptions;
        setFormData((prevData) => ({
            ...prevData,
            options: updatedOptions,
        }));
    };

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
        console.log(formData); // Виведе JSON-об'єкт у консоль
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
                            placeholder="Введіть запитання, наприклад, 'Правда чи брехня: Перші поселення на території України з'явились в добу каменю.'"
                            helperText="Запитання"
                            value={formData.question}
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
                                                    name="answerCorrect"
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
                <Button onClick={createJSON}>Зберегти</Button>
            </Card>
        </Container>
    );
}
