import React, { useState, useEffect } from 'react';
import {Question, Test} from "../common/types";
import {apiGetQuestionsByTest} from "../common/services/question-service";
import {useNavigate, useParams} from "react-router-dom";
import {
    Container,
    Button,
    Stack,
    Typography
} from "@mui/material";
import {QuestionCardList} from "../components/TestComponents/PreviewComponent/QuestionCardList";
import StickyContainer from "react-sticky-box";
import StickyBox from "react-sticky-box";
import TestCardMainInfo from "../components/TestComponents/TestCardMainInfo";
import {apiGetTestById} from "../common/services/test-service";

export function TestPreviewPage() {
    const { testId } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (testId != null) {
            apiGetQuestionsByTest(parseInt(testId))
                .then((data) => {
                    setQuestions(data);
                });
        }
    }, []);

    const [testData, setTestData] = useState<Test>({
        id: 0,
        title: '',
        description: '',
        duration: 0,
        categories: [],
        isPublic: true,
        status: 'Created',
        createdAt: new Date(),
        owner: {
            email: '',
            password: '',
            name: '',
            id: 0
        }
    });

    useEffect(() => {
        if (testId) {
            apiGetTestById(parseInt(testId))
                .then((data) => {
                    setTestData(data);
                })
                .catch((error) => {
                    console.error('Error fetching test data', error);
                });
        }
    });

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/test/${testId}/edit`);
    };

    const handleSubmit = () => {
        navigate(`/my-tests`);
    };

    return (
        <Container>
    <StickyContainer>
        <StickyBox
            offsetTop={0}
            offsetBottom={0}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                padding: '20px',
                margin: '10px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: "white"
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
            >
                <Typography variant="h4">Попередній перегляд тесту</Typography>
                <Stack style={{display:'flex', flexDirection:"row"}}>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={handleEdit}
                        style={{marginRight:'4px'}}
                    >
                        Внести зміни
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                    >
                        Завершити перегляд
                    </Button>
                </Stack>
            </Stack>
        </StickyBox>
        <Stack>
            {testId && <TestCardMainInfo testData={testData} />}
        </Stack>
        <Stack>
            <QuestionCardList questions={questions} />
        </Stack>
    </StickyContainer>
        </Container>
);
}