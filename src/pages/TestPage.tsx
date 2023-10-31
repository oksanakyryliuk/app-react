import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StickyContainer from 'react-sticky-box';
import TestForm from "../components/TestComponents/TestForm";

export function TestPage() {
    const { testId } = useParams();
    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/test');
    }

    return (
        <StickyContainer>
            <TestForm
                testId={testId}
                onCancel={onCancel}
                isEdit={false}
            />
        </StickyContainer>
    );
}