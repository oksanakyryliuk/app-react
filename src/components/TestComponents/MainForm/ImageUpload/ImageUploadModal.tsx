import React, { useState } from 'react';
import ImageUpload from './InputImageUpload';
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { Button } from "evergreen-ui";
import { Container } from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: '0 16px 32px 0 rgba(0,0,0,0.2)',
    padding: '48px',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '28px'
};

interface ImageUploadModalProps {
    open: boolean;
    onClose: () => void;
    onFileUpload: (file: File | null) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ open, onClose, onFileUpload }) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const onCancel = () => {
        console.log('Завантаження скасовано.');
        onClose();
    };

    const onSubmit = () => {
        if (uploadedFile) {
            console.log('Завантажений файл:', uploadedFile);
            onFileUpload(uploadedFile);
        } else {
            console.log('Помилка опрацювання файлу.');
        }
        onClose();
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onCancel}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <ImageUpload onFileUpload={setUploadedFile} />
                    <Container style={buttonContainerStyle}>
                        <Button marginRight={16} onClick={onSubmit} intent="success">
                            Завантажити
                        </Button>
                        <Button onClick={onCancel} intent="danger">
                            Скасувати
                        </Button>
                    </Container>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ImageUploadModal;
