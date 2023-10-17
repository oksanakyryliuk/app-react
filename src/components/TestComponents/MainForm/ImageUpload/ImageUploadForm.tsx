import React, { useState } from 'react';
import { Button, Container } from "@mui/material";
import ImageUploadModal from "./ImageUploadModal";
import {CloudUploadIcon} from "evergreen-ui";

export function ImageUploadForm() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container>
            <Button
                component="label"
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CloudUploadIcon />}
                onClick={handleOpen}
            >
                Завантажити фото
            </Button>
            <ImageUploadModal open={open} onClose={handleClose} />
        </Container>
    );
}
