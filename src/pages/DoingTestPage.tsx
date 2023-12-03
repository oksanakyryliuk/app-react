import React, {useEffect, useState} from 'react';
import { List, ListItem, Button, Card, CardContent, Stack, Container } from '@mui/material';
import {Question, Test} from "../common/types";
import {apiGetTestById} from "../common/services/test-service";
import {Link, useParams} from "react-router-dom";
import {apiGetQuestionsByTest} from "../common/services/question-service";
import TestCardMainInfo from "../components/TestComponents/TestCardMainInfo";
import Modal from "@mui/material/Modal";
import QuestionComponent from "../components/question/question";

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
    const [startClicked, setStartClicked] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };


    // useEffect(() => {
    //     if (testId) {
    //         apiGetTestById(parseInt(testId))
    //             .then((data) => {
    //                 console.log(data)
    //                 setTestData(data);
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching test data', error);
    //             });
    //
    //     }
    // }, [testId]);
    //
    // useEffect(() => {
    //     if (testId != null) {
    //         apiGetQuestionsByTest(parseInt(testId))
    //             .then((data) => {
    //                 console.log(data)
    //                 setQuestions(data);
    //             });
    //     }
    // }, [testId]);

    const fetchData = async () => {
        try {
            // Fetch test data
            if(testId){
                const testDataResponse = await apiGetTestById(parseInt(testId));
                console.log(testDataResponse);
                setTestData(testDataResponse);
            }

            if (testId){
                const questionsDataResponse = await apiGetQuestionsByTest(parseInt(testId));
                console.log(questionsDataResponse);
                setQuestions(questionsDataResponse);
            }

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    const handleEndClick =async () => {
        // setStartClicked(true);
        // await fetchData();
        console.log("end")
    };

    const handleStartClick =async () => {
        setStartClicked(true);
       await fetchData();
    };

    console.log(questions);

    return (
        <Container>
            {!startClicked ?(
            <Stack style={{ margin: '12px' }}>
                {testId && <TestCardMainInfo testData={testData} />}
            </Stack>
            ): null}

            <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                {startClicked ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ padding: '7px', margin: '12px', width: '200px' }}
                        onClick={handleEndClick}
                    >
                        Завершити
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ padding: '7px', margin: '12px', width: '200px' }}
                        onClick={handleStartClick}
                    >
                        Старт
                    </Button>
                )}

            </Stack>

            {startClicked && <QuestionComponent questions={questions} />}


        </Container>
    );
}

export default DoingTestPage;
