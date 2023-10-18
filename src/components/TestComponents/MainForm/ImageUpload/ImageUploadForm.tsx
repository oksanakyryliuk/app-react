import React, { useState, useEffect } from 'react';
import { Button, Container } from "@mui/material";
import ImageUploadModal from "./ImageUploadModal";
import { CloudUploadIcon } from "evergreen-ui";

interface ImageUploadFormProps {
    onFileUpload?: (file: File | null) => void; // `onFileUpload` опціональний
}

export function ImageUploadForm({ onFileUpload }: ImageUploadFormProps) {
    const [open, setOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileUpload = (file: File | null) => {
        setUploadedFile(file);
    };

    useEffect(() => {
        if (onFileUpload) {
            onFileUpload(uploadedFile);
        }
    }, [uploadedFile]);

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
            <ImageUploadModal open={open} onClose={handleClose} onFileUpload={handleFileUpload} />
        </Container>
    );
}
