import React, { useState, useEffect } from 'react';
import { apiDeleteTestById, apiGetTests } from '../common/services/test-service';
import {
    Container,
    Typography,
} from '@mui/material';
import { CreateTestForm } from '../components/TestComponents/ModalCreate/TestForm';
import TestList from "../components/TestComponents/PreviewComponent/TestList";
import DeleteDialog from "../components/TestComponents/DeleteDialog";
import { Test } from "../common/types";

export function GeneralTestsPage() {
    const [tests, setTests] = useState<Test[]>([]);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [testToDeleteId, setTestToDeleteId] = useState<number | null>(null);

    useEffect(() => {
        apiGetTests().then((tests: Test[]) => setTests(tests));
    }, []);

    const handleDeleteTest = (testId: number | null) => {
        if (testId !== null) {
            apiDeleteTestById(testId)
                .then((response) => {
                    console.log(response);
                    closeDeleteDialog();
                    window.location.reload();
                });
        }
    };

    const openDeleteDialog = (testId: number | null) => {
        setTestToDeleteId(testId);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setTestToDeleteId(null);
        setDeleteDialogOpen(false);
    };

    return (
        <Container>
            <Container style={{ margin: "10px 20px" }}>
                <Typography>Test Manager</Typography>
                <CreateTestForm />
            </Container>
            <TestList tests={tests} openDeleteDialog={openDeleteDialog} />
            <DeleteDialog
                open={isDeleteDialogOpen}
                onConfirm={() => handleDeleteTest(testToDeleteId)}
                onCancel={closeDeleteDialog}
                itemText="цей тест"
            />
        </Container>
    );
}
