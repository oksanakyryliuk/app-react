import React, {Dispatch, SetStateAction, useEffect} from "react";
import {
    Button,
    Container,
    InputAdornment,
    InputLabel,
    Stack,
    TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PrevIcon from "../../../../common/icons/left-arrow.png";
import { QuestionDto } from "../../../../common/types";

interface BlankFormProps {
    setShowBlanks: Dispatch<SetStateAction<boolean>>;
    formData: QuestionDto;
    onFormDataChange: (newFormData: QuestionDto) => void;
    questionDto? : QuestionDto;
}

export function BlankForm({ formData, setShowBlanks, onFormDataChange, questionDto }: BlankFormProps) {
    const replaceBlank = formData.title.replace(/\[([^\]]+)\]/g, "___________");

    useEffect(() => {
        const parseTextForBlanks = (text: string) => {
            const regex = /\[([^\]]+)\]/g;
            const matches = [];
            let match;

            while ((match = regex.exec(text))) {
                matches.push(match[1]);
            }

            formData.answers = questionDto?.answers || matches.map((text) => ({
                text,
                isStrictText: false,
                isCorrect: false,
                a_image: null,
            }));

            onFormDataChange(formData);
        };

        parseTextForBlanks(formData.title);

    }, [formData.title]);

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
                {formData.answers.map((option, index) => (
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
                                                const updatedFormData = { ...formData };
                                                updatedFormData.answers[index].isStrictText = !option.isStrictText;
                                                onFormDataChange(updatedFormData);
                                            }}
                                        />
                                        <InputLabel>Враховувати регістр</InputLabel>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => {
                                const updatedFormData = { ...formData };
                                updatedFormData.answers[index].text = e.target.value;
                                onFormDataChange(updatedFormData);
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