import React, { useState, useEffect } from 'react';
import { apiGetPublicTests } from '../common/services/test-service';
import {
    Container,
    Typography,
} from '@mui/material';
import TestList from "../components/TestComponents/PreviewComponent/TestList";
import { Test } from "../common/types";
import ButtonAppBar from "../layouts/someting/nav";

export function GeneralTestsPage() {
    const [tests, setTests] = useState<Test[]>([]);

    useEffect(() => {
        apiGetPublicTests().then((tests: Test[]) => setTests(tests));
    }, []);

    return (
        <div>
        <ButtonAppBar></ButtonAppBar>
        <Container>

            <Container style={{ margin: "10px 20px" }}>
                <Typography></Typography>
            </Container>
            <TestList tests={tests}/>
        </Container>
        </div>
    );
}
