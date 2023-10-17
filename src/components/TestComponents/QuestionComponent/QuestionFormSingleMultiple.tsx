import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Container,
    Checkbox,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Stack,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from "../../../common/icons/plus.png";
import { ImageUploadForm } from "../MainForm/ImageUpload/ImageUploadForm";
import { Radio } from "evergreen-ui";

type QuestionType = 'single' | 'multiple';

interface QuestionFormCommonProps {
    type: QuestionType;
}

export function QuestionFormSingleMultiple({ type }: QuestionFormCommonProps) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', isCorrect: false }]);

    const addOption = () => {
        setOptions([...options, { text: '', isCorrect: false }]);
    };

    const removeOption = (index: number) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
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
                            //value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            sx={{ width: "80%", marginInline: "24px" }}
                        />
                    </Container>
                    <Container sx={{ margin: '32px' }}>
                        <TextField
                            variant="standard"
                            multiline
                            maxRows={4}
                            placeholder={`Додайте коментарі, наприклад, 'Питання потребує ${
                                type === 'single' ? 'однієї' : 'більше'
                            } правильної відповіді.'    (опціонально)`}
                            helperText="Опис"
                            //value={question}
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
                                    //value={option.text}
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
                                                    />
                                                ) : (
                                                    <Checkbox size="small"/>
                                                )}
                                                <InputLabel sx={{ margin: '1rem' }}>Правильна</InputLabel>
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
