import React, { useState, useEffect } from 'react';
import { Button, Container } from "@mui/material";
import { ImageUploadModal } from "./ImageUploadModal";
import { CloudUploadIcon } from "evergreen-ui";
import {FileDTO} from "../../../../common/types";

interface ImageUploadFormProps {
    onFileUpload?: (file: FileDTO | null) => void;
    id: string;
}

export function ImageUploadForm({ onFileUpload, id }: ImageUploadFormProps) {
    const [open, setOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<FileDTO | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileUpload = async (file: FileDTO | null) => {
        try {
            if (onFileUpload && file) {
                setUploadedFile(file);
                onFileUpload(file);
            } else {
                console.error('Помилка: onFileUpload не існує або uploadedFile має неправильні дані');
            }
        } catch (error) {
            console.error('Помилка завантаження файлу', error);
        }
    };

    useEffect(() => {
        console.log('fileid', id);
        if (onFileUpload) {
            onFileUpload(uploadedFile);
        }
    }, [uploadedFile]);

    return (
        <Container>
            {id && (
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
            )}
            <ImageUploadModal open={open} onClose={handleClose} onFileUpload={handleFileUpload} />
        </Container>
    );
}
