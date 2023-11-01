import React, { useState, useEffect } from 'react';
import { apiGetPublicTests } from '../common/services/test-service';
import {
    Container,
    Typography,
} from '@mui/material';
import TestList from "../components/TestComponents/PreviewComponent/TestList";
import { Test } from "../common/types";

export function GeneralTestsPage() {
    const [tests, setTests] = useState<Test[]>([]);

    useEffect(() => {
        apiGetPublicTests().then((tests: Test[]) => setTests(tests));
    }, []);

    return (
        <Container>
            <Container style={{ margin: "10px 20px" }}>
                <Typography></Typography>
            </Container>
            <TestList tests={tests}/>
        </Container>
    );
}
