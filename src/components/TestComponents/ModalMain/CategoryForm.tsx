import React, { useState } from 'react';
import { CategoryModal }  from './CategoryModal';
import { Button } from "@mui/material";
import EditIcon from "../../../common/icons/edit.png";

export function CategoryForm() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={handleOpen}
                startIcon={<img src={EditIcon} alt="EditIcon" />}
            >
                <span style={{ marginTop: '4px' }}>Категорії</span>
            </Button>
            <CategoryModal open={open} onClose={handleClose} />
        </div>
    );
}