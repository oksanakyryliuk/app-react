import React, {useState} from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Container, Stack, IconButton,
} from "@mui/material";
import {Question, QuestionDto} from "../../../common/types";
import {green} from "@mui/material/colors";
import QuizIcon from '@mui/icons-material/Quiz';
import {Alert, EditIcon} from "evergreen-ui";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {QuestionCardOption} from "../PreviewComponent/QuestionCardOption";
import {QuestionCardBlank} from "../PreviewComponent/QuestionCardBlank";
import {apiDeleteQuestionById} from '../../../common/services/question-service';
import DeleteDialog from "../DeleteDialog";
import UpdateDialog from "./UpdateDialog";

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

const QuestionUpdateCardSelect = ({ question, questionIndex }: QuestionCardProps) => {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
    const initialAnswers = [];
    for (let i = 0; i < question.answers.length; i++) {
        initialAnswers.push({
            text: question.answers[i].text,
            a_image: null,
            isCorrect: question.answers[i].isCorrect,
            isStrictText: question.answers[i].isStrictText
        });
    }

    const [questionDto] = useState<QuestionDto>({
        type: question.type.type,
        title: question.title,
        description: question.description,
        q_image: null,
        answers: initialAnswers
    });

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

    const handleQuestionDelete = (questionId: number | null) => {
        if (questionId !== null) {
            apiDeleteQuestionById(questionId)
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                });
        }
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
    }

    const closeUpdateDialog = () => {
        setUpdateDialogOpen(false);
    }

    return (
        <Card  sx={styles.card}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: green[500] }}>
                        <QuizIcon />
                    </Avatar>
                }
                action={
                    <Stack sx={{display:'inline-flex', flexDirection:'row'}}>
                        <IconButton onClick={() => setUpdateDialogOpen(true)}>
                            <EditIcon color={"info"} />
                        </IconButton>
                        <IconButton onClick={() => setDeleteDialogOpen(true)}>
                            <DeleteForeverIcon color={"error"} />
                        </IconButton>
                    </Stack>
                }
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
                <DeleteDialog
                    open={isDeleteDialogOpen}
                    onConfirm={() => handleQuestionDelete(question.id)}
                    onCancel={closeDeleteDialog}
                    itemText="це запитання"
                />
                <UpdateDialog
                    open={isUpdateDialogOpen}
                    onCancel={closeUpdateDialog}
                    questionDto={questionDto}
                    questionId={question.id}
                />
            </Box>
        </Card>
    );
};

export default QuestionUpdateCardSelect;