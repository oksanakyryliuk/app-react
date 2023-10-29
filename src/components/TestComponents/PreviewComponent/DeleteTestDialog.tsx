import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface DeleteDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

function DeleteTestDialog({ open, onConfirm, onCancel }: DeleteDialogProps) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Підтвердіть видалення</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ви впевнені, що бажаєте видалити цей тест?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="error">
                    Скасувати
                </Button>
                <Button onClick={onConfirm} color="success">
                    Підтвердити
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteTestDialog;
