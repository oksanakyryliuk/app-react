import React, {useEffect, useState} from 'react';
import { Stack, Button, Typography } from '@mui/material';
import StickyBox from 'react-sticky-box';
import {QuestionDto, TestDTO} from "../../common/types";
import {apiCreateQuestion} from "../../common/services/question-service";
import {apiGetTestById, apiUpdateTest} from "../../common/services/test-service";
import TestUpdateComponent from "./ModalUpdate/TestUpdateComponent";
import {QuestionSelect} from "./MainForm/QuestionSelect";
import {useNavigate} from "react-router-dom";

interface TestFormProps {
    onCancel: () => void;
    isEdit: boolean;
    testId : string | undefined;
}

function TestForm({ onCancel, isEdit, testId }: TestFormProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [questions, setQuestions] = useState<QuestionDto[]>([]);
    const navigate = useNavigate();
    const [testData, setTestData] = useState<TestDTO>({
        title: '',
        description: '',
        duration: 0,
        categories: [],
        isPublic: true,
        status: 'Created',
    });

    const [state] = useState({
        public: true,
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
    }, [testId]);

    const onSubmit = async () => {
        if (testId == null || !testData.title) return;

        const updatedTestData: TestDTO = {
            title: testData.title,
            description: testData.description,
            duration: testData.duration,
            categories: selectedCategories,
            isPublic: state.public,
            status: 'Created',
        };
        const testIdParam =  parseInt(testId);
        try {
            // Спочатку створюємо питання, а потім відправляємо дані про тест
            await apiCreateQuestion(testIdParam, questions);

            // Після успішного створення питань відправляємо дані про тест
            await apiUpdateTest(testIdParam, updatedTestData);

            navigate('/my-tests');
        } catch (error) {
            console.error('Помилка при створенні або оновленні тесту', error);
        }
    };

    const onSaveCategories = (categories: string[]) => {
        setSelectedCategories(categories);
    };

    return (
        <Stack>
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
                    backgroundColor: 'white',
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <Typography variant="h4">{isEdit ? 'Редагувати тест' : 'Створити новий тест'}</Typography>
                    <Stack style={{ display: 'flex', flexDirection: 'row' }}>
                        {isEdit && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={onCancel}
                                style={{ marginRight: '4px' }}
                            >
                                Скасувати
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="success"
                            disabled={!testData.title || (!isEdit && questions.every((question) => !question.title))}
                            onClick={onSubmit}
                        >
                            {isEdit ? 'Зберегти зміни' : 'Створити тест'}
                        </Button>
                    </Stack>
                </Stack>
            </StickyBox>
            <Stack>
                <TestUpdateComponent testData={testData} onTestDataChange={setTestData} onSaveCategories={onSaveCategories} />
                <QuestionSelect setQuestions={setQuestions}/>
            </Stack>
        </Stack>
    );
}

export default TestForm;