import React, { useState } from 'react';
import TestModal from './TestModal';
import { Button, Container, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export function CreateTestForm() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container>
            <Fab
                color="success"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '30px',
                    zIndex: 1000,
                    textAlign: 'right'
                }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
            <Button  color={"success"} onClick={handleOpen}>Створити тест</Button>
            <TestModal open={open} onClose={handleClose} />
        </Container>
    );
}