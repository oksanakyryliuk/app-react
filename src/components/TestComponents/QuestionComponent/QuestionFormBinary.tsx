import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Container,
    InputLabel,
    TextField,
    Stack,
    InputAdornment
} from '@mui/material';
import { ImageUploadForm } from "../MainForm/ImageUpload/ImageUploadForm";
import { Radio } from "evergreen-ui";

export function QuestionFormBinary() {
    const [question, setQuestion] = useState('');
    const [options] = React.useState([
        { label: 'Правда', value: 'True' },
        { label: 'Брехня', value: 'False' },
    ])

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
                            <ImageUploadForm />
                        </Stack>
                    </Stack>
                    <Container sx={{ margin: '32px' }}>
                        <TextField
                            variant="standard"
                            multiline
                            maxRows={4}
                            placeholder="Введіть запитання, наприклад, 'Правда чи брехня: Перші поселення на території України з'явились в добу каменю.'"
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
                            placeholder="Додайте коментарі, наприклад, 'Виберіть правда або брехня.'    (опціонально)"
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
                                    value={option.label}
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
