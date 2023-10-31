import React, { useState } from 'react';
import {apiCreateTest} from "../../common/services/test-service";
import {useForm} from "react-hook-form";
import {TestDTO} from "../../common/types";
import { Container, Stack, TextField} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export  function TestForm() {
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, formState: { isValid } } = useForm<TestDTO>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate=useNavigate();
    const onSubmit = (data: TestDTO) => {
        apiCreateTest(data)
            .then((response) =>{
                console.log(response);
                    navigate(`/test/${response.id}`);
            }
            )};
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
                }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        <Container maxWidth="xs" sx={{height: '100%'}}>
                            <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%'}}>
                                <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                                       onSubmit={handleSubmit(onSubmit)}>
                                    <TextField label="Title" variant="outlined" autoFocus {...register('title', {required: true})}/>
                                    <Button variant="contained" type="submit" disabled={!isValid}>Create</Button>
                                </Stack>
                            </Stack>
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

//
// // CategoryForm.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import {apiCreateCategory} from "../common/services/category-service";
// import {useForm} from "react-hook-form";
// import {CategoryDTO, LoginDTO} from "../common/types";
// import {useAuth} from "../auth/hooks/useAuth";
// import {Button, Container, Stack, TextField} from "@mui/material";
//
//
// interface CategoryFormProps {
//     createCategory: (data: CategoryDTO) => void; // Визначаємо тип пропу явно
// }
// function CategoryForm({ createCategory } : CategoryFormProps) {
//
//     const { register, handleSubmit, formState: { isValid } } = useForm<CategoryDTO>();
//
//     const onSubmit = (data: CategoryDTO) => {
//         createCategory(data); // Викликаємо функцію для створення категорії та передаємо дані
//     };
//
//     return (
//         <Container maxWidth="xs" sx={{height: '100%'}}>
//             <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%'}}>
//                 <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
//                        onSubmit={handleSubmit(onSubmit)}>
//                     <TextField label="Title" variant="outlined" autoFocus {...register('title', {required: true})}/>
//                     <Button variant="contained" type="submit" disabled={!isValid}>Create</Button>
//                 </Stack>
//             </Stack>
//         </Container>
//     )
// }
//
// export default CategoryForm;
