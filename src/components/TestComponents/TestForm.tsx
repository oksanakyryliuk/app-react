import React, { useState, useEffect } from 'react';
import { apiCreateTest } from '../../common/services/test-service';
import { useForm } from 'react-hook-form';
import { Category, TestDTO } from '../../common/types';
import {
    Box,
    Container,
    Stack,
    TextField,
    Button,
    Typography,
    InputAdornment,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    SelectChangeEvent,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { apiGetCategories } from '../../common/services/category-service';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: '0 16px 32px 0 rgba(0,0,0,0.2)',
    padding: '36px',
    paddingBottom: '48px',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export function TestForm() {
    const [open, setOpen] = React.useState(false);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryTitle, setCategoryTitle] = React.useState<string[]>([]);
    const { register, handleSubmit, formState: { isValid } } = useForm<TestDTO>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        apiGetCategories()
            .then((response) => {
                setCategoryList(response);
            })
            .catch((error) => {
                console.error('An error while getting a category: ', error);
            });
    }, []);

    const onSubmit = (data: TestDTO) => {
        apiCreateTest(data)
            .then((response) => {
                console.log(response);
                navigate(`/test/${response.id}`);
            });
    };

    const onCancel = () => {
        console.log('Storing test creation was canceled.');
        setOpen(false);
        navigate(`/test/`);
    };

    const handleChange = (event: SelectChangeEvent<typeof categoryTitle>) => {
        const {
            target: { value },
        } = event;
        setCategoryTitle(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <Button onClick={handleOpen}>Create test</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
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
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}
                        >
                            Create test
                        </Typography>
                        <Container maxWidth="sm" sx={{ height: '100%' }}>
                            <Stack flexDirection="column" alignContent="center" justifyContent="center" sx={{ height: '100%' }}>
                                <Stack
                                    component="form"
                                    flexDirection="column"
                                    alignContent="center"
                                    justifyContent="center"
                                    spacing={3}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <TextField label="Test name" variant="outlined" autoFocus {...register('title', { required: true })} />
                                    <TextField label="Test description" variant="outlined" multiline rows={4} {...register('description')} />
                                    <FormControl sx={{ m: 1 }}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            multiple
                                            value={categoryTitle}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Category" />}
                                            MenuProps={MenuProps}
                                        >
                                            {categoryList.map(({ id, title }) => (
                                                <MenuItem key={id} value={id}>
                                                    {title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Duration"
                                        variant="outlined"
                                        autoFocus
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                        }}
                                        {...register('duration', { required: true })}
                                    />
                                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                        <Button variant="contained" color="error" onClick={onCancel}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" type="submit" color="success" disabled={!isValid}>
                                            Create test
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}