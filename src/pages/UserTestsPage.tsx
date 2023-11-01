import React, { useState, useEffect } from 'react';
import {apiDeleteTestById, apiGetTestsByUser} from '../common/services/test-service';
import {
    Container,
    Typography,
} from '@mui/material';
import { CreateTestForm } from '../components/TestComponents/ModalCreate/TestForm';
import DeleteDialog from "../components/TestComponents/DeleteDialog";
import { Test } from "../common/types";
import TestListWithMenu from "../components/TestComponents/TestListWithMenu";
import { Alert } from 'evergreen-ui';

const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    noTestsMessage: {
        fontSize: '18px',
        fontStyle: 'italic',
    },
};

export function UserTestsPage() {
    const [tests, setTests] = useState<Test[]>([]);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [testToDeleteId, setTestToDeleteId] = useState<number | null>(null);

    useEffect(() => {
        apiGetTestsByUser()
            .then((tests: Test[]) => {
                setTests(tests);
            })
            .catch(error => {
                console.log("Помилка отримання даних про тести користувача", error);
            });
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
                <Typography style={styles.heading}>Мої тести</Typography>
                <CreateTestForm />
            </Container>
            {tests.length > 0 ? (
                <TestListWithMenu tests={tests} openDeleteDialog={openDeleteDialog} />
            ) : (
                <Alert
                intent="success"
                title="Ви ще не створили жодного тесту"
                marginBottom={32}
                >
                    Розпочніть покращення власного 'Я' вже сьогодні. Натисніть кнопку "Створити тест", щоб перейти до створення.
                </Alert>
            )}
            <DeleteDialog
                open={isDeleteDialogOpen}
                onConfirm={() => handleDeleteTest(testToDeleteId)}
                onCancel={closeDeleteDialog}
                itemText="цей тест"
            />
        </Container>
    );
}
