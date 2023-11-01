import React from 'react';
import { List, ListItem, Button, Card, CardContent, Stack, Container } from '@mui/material';
import TestCardMainInfo from "../TestCardMainInfo";
import {Test} from "../../../common/types";

interface TestListProps {
    tests: Test[];
}

function TestList({ tests } : TestListProps) {
    return (
        <Container>
            <List>
                {tests.map((test, index) => (
                    <ListItem
                        style={{ width: '100%' }}
                        key={index}
                    >
                        <Card style={{ width: '100%' }} >
                            <CardContent style={{ padding: 0 }}>
                                {test.id && <TestCardMainInfo testData={test} />}
                            </CardContent>
                            <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    style={{ margin: '12px', width: '200px' }}
                                >
                                    Почати тестування
                                </Button>
                            </Stack>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default TestList;
