import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Button,
    Container,
    InputAdornment,
    InputLabel,
    Stack,
    TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PrevIcon from "../../../common/icons/left-arrow.png";
import {FileDTO} from "../../../common/types";

interface BlankFormProps {
    question: string;
    setShowBlanks: Dispatch<SetStateAction<boolean>>;
    options: Blank[];
    onOptionsChange: (options: Blank[]) => void;
}

interface Blank {
    text: string,
    isStrictText: boolean,
    isCorrect: boolean,
    a_image: FileDTO | null,
}

export function BlankForm({ question, setShowBlanks, options, onOptionsChange }: BlankFormProps) {
    const [blanks, setBlanks] = useState<Blank[]>(options);
    const replaceBlank = question.replace(/\[([^\]]+)\]/g, "___________");

    useEffect(() => {
        const parseTextForBlanks = (text: string) => {
            const regex = /\[([^\]]+)\]/g;
            const matches = [];
            let match;

            while ((match = regex.exec(text))) {
                matches.push(match[1]);
            }

            const newBlanks = matches.map((text) => ({
                text,
                isStrictText: false,
                isCorrect: false, // Початкове значення isCorrect
                a_image: null,    // Початкове значення a_image
            }));

            setBlanks(newBlanks);
            onOptionsChange(newBlanks); // Оновлення options у головному компоненті
        };

        parseTextForBlanks(question);
    }, [question]);

    return (
        <Container>
            <Container>
                <TextField
                    variant="standard"
                    multiline
                    maxRows={4}
                    helperText="Запитання"
                    value={replaceBlank}
                    sx={{ width: "80%", marginInline: "24px" }}
                />
            </Container>
            <Container sx={{ margin: "32px" }}>
                <InputLabel sx={{ marginBlock: "1rem" }}>Пропуски:</InputLabel>
                {blanks.map((option, index) => (
                    <Stack key={index}>
                        <TextField
                            variant="standard"
                            fullWidth
                            value={option.text}
                            placeholder="Додайте варіант відповіді"
                            multiline
                            maxRows={4}
                            sx={{ width: "60%", marginBottom: "1rem" }}
                            helperText={`Пропуск №${index + 1}`}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Checkbox
                                            size="small"
                                            checked={option.isStrictText}
                                            onChange={() => {
                                                const updatedBlanks = [...blanks];
                                                updatedBlanks[index].isStrictText = !option.isStrictText;
                                                setBlanks(updatedBlanks);
                                            }}
                                        />
                                        <InputLabel>Враховувати регістр</InputLabel>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                ))}
            </Container>
            <Button
                variant="contained"
                startIcon={<img src={PrevIcon} alt="continue" />}
                size="small"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "18px",
                    ml: "auto",
                }}
                onClick={() => {
                    setShowBlanks(false);
                }}
            >
                Назад
            </Button>
        </Container>
    );
}
