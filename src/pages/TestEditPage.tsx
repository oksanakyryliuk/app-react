import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Stack} from '@mui/material';
import StickyContainer from 'react-sticky-box';
import {Question} from '../common/types';
import {apiGetQuestionsByTest} from "../common/services/question-service";
import {QuestionUpdateCardList} from "../components/TestComponents/ModalUpdate/QuestionUpdateCardList";
import TestForm from "../components/TestComponents/TestForm";

export function TestEditPage() {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [existingQuestions, setExistingQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (testId != null) {
            apiGetQuestionsByTest(parseInt(testId))
                .then((data) => {
                    setExistingQuestions(data);
                });
        }
    }, []);

    const onCancel = () => {
        navigate('/my-tests');
    }

    return (
        <StickyContainer>
            <TestForm
                testId={testId}
                onCancel={onCancel}
                isEdit={true}
            />
            <Stack>
                <QuestionUpdateCardList questions={existingQuestions} />
            </Stack>
        </StickyContainer>
    );
}