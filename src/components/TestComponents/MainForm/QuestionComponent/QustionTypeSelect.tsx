import React, { useState } from 'react';
import { FormControl } from '@mui/material';
import { QuestionType } from '../../../../common/types';
import { useForm } from 'react-hook-form';
import {Combobox, toaster} from "evergreen-ui";

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

interface QuestionSelectProps {
    questionTypeList: QuestionType[];
    onChange: (value: string) => void;
    value: string;
}

const QuestionTypeSelect = ({ questionTypeList, onChange }: QuestionSelectProps) => {
    const { register } = useForm();
    const [selectedType, setSelectedType] = useState<string | null>('');
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (selected: { label: string, id: string } | null) => {
        if (selected) {
            setSelectedType(selected.label);
            onChange(selected.label);
        } else {
            toaster.danger('Упс, схоже, що ви не обрали тип запитання.')
            return
        }
    };


    return (
        <FormControl sx={{ m: 1, width: 250 }}>
            <Combobox
                initialSelectedItem={{ label: 'Тип запитання' }}
                items={questionTypeList.map(({ type }) => ({ label: type, id: type }))}
                itemToString={item => (item ? item.label : '')}
                onChange={selected => handleChange(selected)}
            />
        </FormControl>
    );
}

export default QuestionTypeSelect;
