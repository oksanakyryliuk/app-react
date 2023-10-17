import React, {Dispatch, SetStateAction} from "react";
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

interface BlankFormProps {
    question: string;
    blanks: { text: string; caseSensitive: boolean }[];
    setShowBlanks: (show: boolean) => Dispatch<SetStateAction<boolean>>;
}

export function BlankForm({ question, blanks, setShowBlanks }: BlankFormProps) {

    return (
        <Container>
            <Container>
                <TextField
                    variant="standard"
                    multiline
                    maxRows={4}
                    helperText="Запитання"
                    value={question}
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
                                        <Checkbox size="small" />
                                        <InputLabel>
                                            Враховувати регістр
                                        </InputLabel>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                ))}
            </Container>
            <Button
                variant="contained"
                startIcon={
                    <img src={PrevIcon} alt="continue"/>
                }
                size="small"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '18px',
                    ml: 'auto',
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
