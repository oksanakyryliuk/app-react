import React, { useState } from 'react';
import TestModal from './TestModal';
import { Button } from "@mui/material";

export function CreateTestForm() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Create test</Button>
            <TestModal open={open} onClose={handleClose} />
        </div>
    );
}