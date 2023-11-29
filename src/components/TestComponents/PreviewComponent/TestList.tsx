import React from 'react';
import { List, ListItem, Button, Card, CardContent, Stack, Container } from '@mui/material';
import TestCardMainInfo from "../TestCardMainInfo";
import {Test} from "../../../common/types";
import {Link} from "react-router-dom";
import {AppModules} from "../../../common/enums/AppModules";

interface TestListProps {
    tests: Test[];
}

function TestList({ tests } : TestListProps) {
    return (
        <Container>
            <List style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tests.map((test, index) => (
                    <ListItem key={index} style={{ width: '50%', boxSizing: 'border-box' }}>
                        <Card style={{ width: '100%' , margin: '12px', }}>
                            <CardContent style={{ padding: 0 }}>
                                {test.id && <TestCardMainInfo testData={test} />}
                            </CardContent>
                            <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Button    variant="contained"
                                           color="secondary"
                                           style={{ margin: '12px', width: '200px' }}>
                                <Link to={`/doing-test/${index}`}>
                                    Почати тестування
                                </Link>
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
