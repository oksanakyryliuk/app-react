import React from 'react';
import { Button } from '@mui/material';

interface FixedButtonsProps {
    isSaveButtonDisabled: boolean;
    onSave: () => void;
    onCancel: () => void;
}

const FixedButtons: React.FC<FixedButtonsProps> = ({ isSaveButtonDisabled, onSave, onCancel }) => {
    return (
        <div
            style={{
                position: 'sticky',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#fff',
                paddingInline: '64px',
                width: '400px',
            }}
        >
            <Button
                variant="contained"
                color="primary"
                size="medium"
                disabled={isSaveButtonDisabled}
                style={{marginRight:'10px'}}
                onClick={onSave}
            >
                Зберегти
            </Button>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{marginRight:'10px'}}
                onClick={onCancel}
            >
                Скасувати
            </Button>
        </div>
    );
};

export default FixedButtons;
