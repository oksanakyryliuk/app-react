import React from 'react';
import {
    Container, Divider, Stack,
    TextField, Typography
} from "@mui/material";
import { Question } from "../../../common/types";
import Box from "@mui/material/Box";

const styles = {
    contained: {
        display: 'flex',
        flexDirection: 'row',
    },
    questionMain: {
        flex: 1,
        alignItems: 'center',
        lineHeight: '64px',
        top: "50%",
    },
    media: {
        paddingLeft: '24px',
        maxWidth: '250px',
        maxHeight: '350px'
    },
};

export const QuestionCardBlank = ({ question }: { question: Question }) => {
    const renderQuestionSegments = () => {
        if (question.answers) {
            const segments = question.title.replace(/\[([^\]]+)\]/g, '[').split('[');
            return segments.map((segment, index) => {
                if (index === 0) {
                    return (
                        <span key={index}>
                            {segment}
                        </span>
                    );
                } else if (question.answers[index - 1]) {
                    return (
                        <React.Fragment key={index}>
                            <TextField
                                key={`blank-id-${index}`}
                                color="success"
                                focused
                                value={question.answers[index - 1].text}
                                variant="outlined"
                                sx={{
                                    marginTop: '4px',
                                    width: '300px',
                                    overflow: 'visible',
                                    alignContent: 'center',
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "rgba(0, 0, 0, 0.8)",
                                    }
                                }}
                            />
                            <span>
                                {segment}
                            </span>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <span key={index}>
                            {segment}
                        </span>
                    );
                }
            });
        } else {
            return <span>{question.title}</span>;
        }
    };

    return (
        <Container>
            <Container sx={styles.contained}>
                <Box sx={styles.questionMain}>
                    {renderQuestionSegments()}
                    {question.description && (
                        <Stack>
                            <Divider sx={{ marginTop: '12px' }} />
                            <Typography variant="caption" display="block" gutterBottom color='#bdbdbd'>
                                {question.description}
                            </Typography>
                        </Stack>
                    )}
                </Box>
                {question.image && (
                    <img
                        src={question.image}
                        alt="Фотографія запитання"
                        style={styles.media}
                    />
                )}
            </Container>
        </Container>
    );
};
