import { FileCard, Pane, FileUploader, Alert } from 'evergreen-ui';
import React, { useState } from 'react';
import { Container } from "@mui/material";
import {FileDTO} from "../../../../common/types";

interface ImageUploadProps {
    onFileUpload: (file: FileDTO | null) => void; // Змінено тип параметра на FileDto
}

function ImageUpload({ onFileUpload }: ImageUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [fileRejections, setFileRejections] = useState<any[]>([]);

    const [showAlert, setShowAlert] = useState(false);

    const handleChange = React.useCallback(async (uploadedFiles: File[]) => {
        const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (uploadedFiles.length > 0) {
            const file = uploadedFiles[0];
            if (allowedExtensions.includes(file.type)) {
                setFiles([file]);
                setShowAlert(false);

                // Створення об'єкта FileDto
                const fileDto = {
                    fileName: file.name,
                    contentType: file.type,
                    data: Array.from(new Uint8Array(await file.arrayBuffer()))
                };

                onFileUpload(fileDto);
            } else {
                setFileRejections([{file, message: 'Дозволено завантажувати лише зображення'}]);
                setShowAlert(true);
            }
        }
    }, [onFileUpload]);

    const handleRemove = React.useCallback(() => {
        setFiles([]);
        setFileRejections([]);
        setShowAlert(false);
        onFileUpload(null);
    }, [onFileUpload]);

    return (
        <Pane maxWidth={654}>
            {showAlert && (
                <Container sx={{ paddingBottom: '28px' }}>
                    <Alert
                        intent="danger"
                        title="Неможливо зберегти зміни"
                    >
                        Дозволено завантажувати лише зображення форматів: '/jpeg', '/jpg', '/png', '/gif'.
                    </Alert>
                </Container>
            )}
            <FileUploader
                label="Завантаження зображення"
                description="Ви можете завантажити 1 файл. Файл може бути до 20 Мб."
                maxSizeInBytes={20 * 1024 ** 2}
                maxFiles={1}
                onChange={handleChange}
                onRejected={handleRemove}
                renderFile={(file) => {
                    const { name, size, type } = file;
                    const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file);
                    const { message } = fileRejection || {};
                    return (
                        <FileCard
                            key={name}
                            isInvalid={fileRejection != null}
                            name={name}
                            onRemove={handleRemove}
                            sizeInBytes={size}
                            type={type}
                            validationMessage={message}
                        />
                    );
                }}
                values={files}
            />
        </Pane>
    );
}

export default ImageUpload;