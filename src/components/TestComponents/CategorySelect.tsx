import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    SelectChangeEvent,
    MenuItem,
} from '@mui/material';
import { Category } from '../../common/types';
import { useForm } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface CategorySelectProps {
    categoryList: Category[];
    categoryTitle: string[];
    onChange: (value: string[]) => void;
}

function CategorySelect({ categoryList, categoryTitle, onChange }: CategorySelectProps) {
    const { register } = useForm();

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        onChange(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ m: 1 }}>
            <InputLabel>Категорія</InputLabel>
            <Select
                multiple
                value={categoryTitle}
                onChange={handleChange}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
            >
                {categoryList.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>
                        {title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CategorySelect;
