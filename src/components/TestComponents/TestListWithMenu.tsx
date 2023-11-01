import React, { useState } from 'react';
import { List, ListItem, IconButton, Tooltip, Button, Card, CardContent, Stack, Container } from '@mui/material';
import SideMenuIcon from '../../common/icons/kebab.png';
import { useNavigate } from "react-router-dom";
import TestMenu from './PreviewComponent/TestMenu';
import TestCardMainInfo from "./TestCardMainInfo";
import {Test} from "../../common/types";

interface TestListProps {
    tests: Test[];
    openDeleteDialog: (testId: number | null) => void;
}

function TestListWithMenu({ tests, openDeleteDialog } : TestListProps) {
    const navigate = useNavigate();
    const [menuTestId, setMenuTestId] = useState<number | null>(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const handlePreviewClick = () => {
        if (menuTestId !== null) {
            navigate(`/test/${menuTestId}/preview`);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        openDeleteDialog(menuTestId);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, testId: number) => {
        if (event.currentTarget) {
            setMenuAnchorEl(event.currentTarget);
        }
        setMenuTestId(testId);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return (
        <Container>
            <List>
                {tests.map((test, index) => (
                    <ListItem
                        style={{ width: '100%' }}
                        key={index}
                        secondaryAction={
                            <Tooltip title="Додатково">
                                <IconButton
                                    onClick={(event) => handleMenuClick(event, test.id)}
                                    style={{ paddingInline: '4px' }}
                                >
                                    <img src={SideMenuIcon} alt="edit" />
                                </IconButton>
                            </Tooltip>
                        }
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
            <TestMenu
                menuAnchorEl={menuAnchorEl}
                handleMenuClose={handleMenuClose}
                handlePreviewClick={handlePreviewClick}
                handleDeleteClick={handleDeleteClick}
            />
        </Container>
    );
}

export default TestListWithMenu;
