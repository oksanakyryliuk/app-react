import React, { useState, useEffect } from 'react';
import { apiDeleteTestById, apiGetTests } from '../common/services/test-service';
import {
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    List,
    ListItem,
    MenuItem, Stack,
    Typography,
} from '@mui/material';
import { CreateTestForm } from '../components/TestComponents/ModalCreate/TestForm';
import TestCardMainInfo from '../components/TestComponents/TestCardMainInfo';
import SideMenuIcon from '../common/icons/kebab.png';
import { Tooltip } from 'evergreen-ui';
import Menu from '@mui/material/Menu';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from 'react-router-dom';
import {Test} from "../common/types";

export function GeneralTestsPage() {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [tests, setTests] = useState<Test[]>([]);
    const [menuTestId, setMenuTestId] = useState<number | null>(null);

    useEffect(() => {
        apiGetTests().then(tests=> setTests(tests)); // Функція для завантаження категорій при першому завантаженні компонента
    }, []);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, testId: number) => {
        if (event.currentTarget) {
            setMenuAnchorEl(event.currentTarget);
        }
        setMenuTestId(testId);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const navigate = useNavigate();
    const handlePreviewClick = () => {
        if (menuTestId !== null) {
            navigate(`/test/${menuTestId}/preview`);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        if (menuTestId !== null) {
            apiDeleteTestById(menuTestId)
                .then((response: any) => {
                    console.log(response);
                    window.location.reload();
                });
        }
        handleMenuClose();
    };

    return (
        <Container>
            <Container style={{ margin: "10px 20px" }}>
                <Typography>Test Manager</Typography>
                <CreateTestForm />
            </Container>
            <Container>
                <List>
                    {tests.map((test, index) => (
                        <ListItem
                            style={{ width: '100%' }}
                            key={index}
                            secondaryAction={
                                <Tooltip content="Додатково">
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
                                <CardContent style={{padding:0}}>
                                    {test.id && <TestCardMainInfo testData={test} />}
                                </CardContent>
                                <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        style={{margin: '12px', width: '200px'}}
                                    >
                                        Почати тестування
                                    </Button>
                                </Stack>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Container>
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                sx={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handlePreviewClick}>
                    <PreviewIcon color={'primary'} style={{paddingRight: '4px'}}/> Переглянути
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <DeleteForeverIcon color={'error'} style={{paddingRight: '4px'}}/> Видалити тест
                </MenuItem>
            </Menu>
        </Container>
    );
}