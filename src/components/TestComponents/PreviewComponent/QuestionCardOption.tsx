import React from 'react';
import {
    Container,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { Question } from "../../../common/types";
import Box from "@mui/material/Box";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const styles = {
    contained: {
        display: 'flex',
        flexDirection: 'row',
    },
    questionMain: {
        flex: 1
    },
    media: {
        paddingLeft: '24px',
        width: '250px',
    },
};

export const QuestionCardOption = ({ question }: { question: Question }) => {
    return (
        <Container>
            <Container sx={styles.contained}>
                <Box sx={styles.questionMain}>
                    <TextField
                        id="question-title"
                        disabled={true}
                        value={question.title}
                        variant="standard"
                        sx={{
                            width: '100%',
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "rgba(0, 0, 0, 0.8)",
                            }
                        }}
                        helperText={question.description}
                    />
                </Box>
                {question.q_image && (
                    <img
                        src={question.q_image}
                        alt="Фотографія запитання"
                        style={styles.media}
                    />
                )}
            </Container>
            <Divider textAlign="left" sx={{ marginBlock: '24px' }}>Варіанти відповідей</Divider>
            <Grid container spacing={1}>
                {question.answers.map((answer, index) => (
                    <Grid
                        item xs={6}
                        key={index}
                        sx={{
                            display: 'flex',
                            backgroundColor: answer.isCorrect ? '#c8e6c9' : 'transparent',
                    }}>
                        <Stack>
                            <Stack
                                id="answer-display"
                                direction="row"
                                alignItems="center"
                            >
                                {question.type.id === 2
                                    ? <CheckBoxOutlineBlankIcon fontSize={"small"} />
                                    : <RadioButtonUncheckedIcon fontSize={"small"} />
                                }
                                <Typography variant="body2" display="block" gutterBottom style={{ paddingInline: '12px', paddingTop:'4px' }}>
                                    {answer.text}
                                </Typography>
                            </Stack>
                            <Stack sx={{ margin: '8px' }}>
                                {answer.a_image && (
                                    <img
                                        src={answer.a_image}
                                        alt="Фотографія відповіді"
                                        style={styles.media}
                                    />
                                )}
                            </Stack>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
