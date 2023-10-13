import React, { useState } from 'react';
import { Button, Container } from "@mui/material";
import SelectIcon from "../../../../common/icons/select.png";
import ImageUploadModal from "./ImageUploadModal";

export function ImageUploadForm() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                    marginInline: '18px'
                }}
                startIcon={<img src={SelectIcon} alt="SelectIcon" width="20px" />}
                onClick={handleOpen}
            >
                Додати Фотографію
            </Button>
            <ImageUploadModal open={open} onClose={handleClose} />
        </Container>
    );
}
