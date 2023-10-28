import React from 'react';

import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Container,
} from "@mui/material";
import {Question} from "../../../common/types";
import {green} from "@mui/material/colors";
import QuizIcon from '@mui/icons-material/Quiz';
import {Alert} from "evergreen-ui";
import {QuestionCardOption} from "./QuestionCardOption";
import Box from "@mui/material/Box";
import {QuestionCardBlank} from "./QuestionCardBlank";

interface QuestionCardProps {
    question: Question;
    questionIndex: number;
}

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: '8px',
        width: '80%',
    },
    content: {
        flex: 1,
    },
    media: {
        padding: '20px',
        width: '250px',
    },
};

const QuestionCardSelect = ({ question, questionIndex }: QuestionCardProps) => {
    let subheader = "Тип запитання: ";
    switch (question.type.id) {
        case 1:
            subheader += "Єдиний вибір";
            break;
        case 2:
            subheader += "Множинний вибір";
            break;
        case 3:
            subheader += "Правда / Брехня";
            break;
        case 4:
            subheader += "Заповнити пропуски";
            break;
        default:
            subheader += "Інший тип";
    }

    return (
        <Card  sx={styles.card}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: green[500] }}>
                        <QuizIcon />
                    </Avatar>
                }
                /*action={
                    <Stack sx={{display:'inline-flex', flexDirection:'row'}}>
                        <IconButton>
                            <EditIcon color={"info"} />
                        </IconButton>
                        <IconButton>
                            <DeleteForeverIcon color={"error"} />
                        </IconButton>
                    </Stack>
                }*/
                title={`Запитання №${questionIndex + 1}`}
                subheader={subheader}
            />
            <Box sx={{ display: 'inline-flex', flexDirection: 'row'}}>
                <CardContent sx={styles.content}>
                    {question.type.id === 1 || question.type.id === 2 || question.type.id === 3 ? (
                        <QuestionCardOption question={question} />
                    ) : question.type.id === 4 ? (
                    <QuestionCardBlank question={question} />
                ) : (
                        <Container>
                            <Alert intent="danger"
                                   title="Невідповідний тип запитання"
                            >
                                В базі даних не існує запитання вказаного типу.
                            </Alert>
                        </Container>
                    )}
                </CardContent>
            </Box>
        </Card>
    );
};

export default QuestionCardSelect;