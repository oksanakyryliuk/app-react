import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
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

export function QuestionFormBlank() {
    const [question, setQuestion] = useState('');
    const [blanks, setBlanks] = useState([
        {
            text: '',
            caseSensitive: false,
        }
    ]);
    const [showBlanks, setShowBlanks] = useState(false);

    const parseTextForBlanks = (text: string) => {
        const regex = /[(.*?)]/g;
        const matches = [];
        let match;

        while ((match = regex.exec(text))) {
            matches.push(match[1]);
        }

        const newBlanks = matches.map((text) => ({ text, caseSensitive: false }));
        setBlanks(newBlanks);
    };

    const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuestion = e.target.value;
        setQuestion(newQuestion);
        parseTextForBlanks(newQuestion);
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
                            <ImageUploadForm />
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
                                    placeholder="Введіть запитання, наприклад, 'В добу [палеоліту] з'явились перші поселення на території України."
                                    helperText="Запитання"
                                    value={question}
                                    onChange={handleQuestionChange}
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
                                    //onChange={(e) => setQuestion(e.target.value)}
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
                            question={question}
                            blanks={blanks}
                            setShowBlanks={() => setShowBlanks(false) as unknown as Dispatch<SetStateAction<boolean>>}
                        />
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}
