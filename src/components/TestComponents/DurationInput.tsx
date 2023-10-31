import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';

interface DurationInputProps {
    register: UseFormRegister<FieldValues>;
    value?: number;
}

function DurationInput({ register, value }: DurationInputProps) {
    return (
        <div>
            <TextField
                label="Час на виконання"
                variant="outlined"
                autoFocus
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="end">хв</InputAdornment>,
                }}
                {...register('duration', {
                    required: true,
                    validate: (val) => val === undefined || (parseInt(val) >= 0 && parseInt(val) <= 360),
                })}
                value={value || ''}
            />
        </div>
    );
}

export default DurationInput;
