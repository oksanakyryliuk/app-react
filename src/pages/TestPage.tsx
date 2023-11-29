import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StickyContainer from 'react-sticky-box';
import TestForm from "../components/TestComponents/TestForm";
import {Container} from '@mui/material'
export function TestPage() {
    const { testId } = useParams();
    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/my-tests');
    }

    return (
        <Container>
            <TestForm
                testId={testId}
                onCancel={onCancel}
                isEdit={false}
            />
            </Container>
    );
}