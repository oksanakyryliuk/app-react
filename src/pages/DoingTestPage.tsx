import React, {useEffect, useState} from 'react';
import { List, ListItem, Button, Card, CardContent, Stack, Container } from '@mui/material';
import {Question, Test} from "../common/types";
import {apiGetTestById} from "../common/services/test-service";
import {Link, useParams} from "react-router-dom";
import {apiGetQuestionsByTest} from "../common/services/question-service";
import TestCardMainInfo from "../components/TestComponents/TestCardMainInfo";
import Modal from "@mui/material/Modal";

function DoingTestPage() {
    const { testId } = useParams();
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
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const handleNextQuestion = () => {
        // Update the index to show the next question
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

        // You can add additional logic here, e.g., checking if it's the last question
    };


    useEffect(() => {
        if (testId) {
            apiGetTestById(parseInt(testId))
                .then((data) => {
                    console.log(data)
                    setTestData(data);
                })
                .catch((error) => {
                    console.error('Error fetching test data', error);
                });

        }
    }, [testId]);

    useEffect(() => {
        if (testId != null) {
            apiGetQuestionsByTest(parseInt(testId))
                .then((data) => {
                    console.log(data)
                    setQuestions(data);
                });
        }
    }, [testId]);


    return (
        <Container>
            <Stack style={{ margin: '12px' }}>
                {testId && <TestCardMainInfo testData={testData} />}
            </Stack>
            <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ padding: '7px', margin: '12px', width: '200px' }}
                    onClick={() => setShowModal(true)}
                >
                    Старт
                </Button>
            </Stack>

            {/*{showModal && (*/}
            {/*    // <Modal>*/}
            {/*    //     <div>{questions[currentQuestionIndex]?.title}</div>*/}
            {/*    //     <Button onClick={handleNextQuestion}>Next</Button>*/}
            {/*    // </Modal>*/}
            {/*)}*/}
        </Container>
    );
}

export default DoingTestPage;
