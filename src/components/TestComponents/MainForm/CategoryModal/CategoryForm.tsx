import React, { useState } from 'react';
import { CategoryModal }  from './CategoryModal';
import { Button, Stack } from "@mui/material";
import EditIcon from "../../../../common/icons/edit.png";

interface CategoryFormProps {
    onSaveCategories: (categories: string[]) => void;
}

export function CategoryForm({ onSaveCategories }: CategoryFormProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSaveCategories = (selectedCategories: string[]) => {
        onSaveCategories(selectedCategories);
    };

    return (
        <Stack>
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
            <CategoryModal open={open} onClose={handleClose} onSaveCategories={handleSaveCategories} />
        </Stack>
    );
}
