import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';

interface DurationInputProps {
    register: UseFormRegister<FieldValues>;
}

function DurationInput({ register }: DurationInputProps) {
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
                    validate: (value) => parseInt(value) <= 360,
                })}
            />
        </div>
    );
}

export default DurationInput;