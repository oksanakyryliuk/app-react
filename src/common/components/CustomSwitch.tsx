import React, { useState } from 'react';
import Button from '@mui/material/Button';

type SwitchOption = {
    label: string;
    value: boolean;
    imageIcon: React.ReactNode;
};

type CustomSwitchProps = {
    options: SwitchOption[];
    onChange: (value: boolean) => void;
    size: 'small' | 'medium' | 'large';
};

function CustomSwitch({ options, onChange, size }: CustomSwitchProps) {
    const [selectedValue, setSelectedValue] = useState<boolean | null>(options[0].value);

    const handleOptionClick = (value: boolean) => {
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div>
            {options.map((option) => (
                <Button
                    key={option.value.toString()}
                    variant={selectedValue === option.value ? 'contained' : 'outlined'}
                    sx={{
                        color: selectedValue === option.value ? 'primary' : 'text.secondary',
                        backgroundColor: selectedValue === option.value ? 'primary.main' : 'background.paper',
                        border: '0',
                    }}
                    onClick={() => handleOptionClick(option.value)}
                    startIcon={option.imageIcon}
                    size={size}
                >
                    {option.label}
                </Button>
            ))}
        </div>
    );
}

export default CustomSwitch;