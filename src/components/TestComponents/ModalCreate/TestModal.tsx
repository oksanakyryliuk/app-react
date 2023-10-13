import React, { useState, useEffect } from 'react';
import { apiCreateTest } from '../../../common/services/test-service';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { Category, TestDTO } from '../../../common/types';
import {
    Box,
    Container,
    Stack,
    TextField,
    Button,
    Typography,
    Switch,
    FormControlLabel
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CategorySelect from './CategorySelect';
import DurationInput from './DurationInput';
import { apiGetCategories } from '../../../common/services/category-service';
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: '0 16px 32px 0 rgba(0,0,0,0.2)',
    padding: '32px',
    paddingBottom: '48px',
};

interface TestModalProps {
    open: boolean;
    onClose: () => void;
}

function TestModal({ open, onClose }: TestModalProps) {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryTitle, setCategoryTitle] = useState<string[]>([]);
    const { register, handleSubmit, formState: { isValid } } = useForm<FieldValues>();
    const navigate=useNavigate();

    useEffect(() => {
        apiGetCategories()
            .then((response) => {
                setCategoryList(response);
            })
            .catch((error) => {
                console.error('An error while getting a category: ', error);
            });
    }, []);

    const [state, setState] = React.useState({
        public: true
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const testData: TestDTO = {
            Title: data.title,
            Description: data.description,
            Duration: data.duration,
            Categories: categoryTitle,
            IsPublic : state.public,
            Status: 'Draft'
        };
        apiCreateTest(testData)
            .then((response: any) => {
                console.log(response);
                onClose();
                navigate(`/test/${response.id}`);
            });
    };

    const onCancel = () => {
        console.log('Storing test creation was canceled.');
        onClose();
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Container style={{ display: 'flex', alignItems: 'center', paddingBottom: '64px' }}>
                        <Typography
                            id="test-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ fontSize: '24px', fontWeight: 'bold' }}
                        >
                            Загальні відомості
                        </Typography>
                        <Stack style={{ marginLeft: 'auto' }}>
                            <FormControlLabel
                                control={
                                    <Switch checked={state.public} onChange={handleChange} name="public" />
                                }
                                label="Доступний усім"
                            />
                        </Stack>
                    </Container>
                    <Container maxWidth="sm" sx={{ height: '100%' }}>
                        <Stack
                            component="form"
                            flexDirection="column"
                            alignContent="center"
                            justifyContent="center"
                            spacing={3}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField label="Назва тесту" variant="outlined" autoFocus {...register('title', { required: true })} />
                            <TextField label="Опис тесту" variant="outlined" multiline rows={4} {...register('description')} />
                            <CategorySelect
                                categoryList={categoryList}
                                categoryTitle={categoryTitle}
                                onChange={setCategoryTitle}
                            />
                            <DurationInput register={register} />
                            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                <Button variant="contained" color="error" onClick={onCancel}>
                                    Скасувати
                                </Button>
                                <Button variant="contained" type="submit" color="success" disabled={!isValid}>
                                    Створити тест
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Fade>
        </Modal>
    );
}

export default TestModal;
