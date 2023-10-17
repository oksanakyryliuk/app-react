import React, { useState } from 'react';
import { Stack, Button } from '@mui/material';
import { DropUpQuestionMenu } from './DropUpQuestionMenu';
import { QuestionFormSingleMultiple } from '../QuestionComponent/QuestionFormSingleMultiple';
import { QuestionFormBinary } from '../QuestionComponent/QuestionFormBinary';
import { QuestionFormBlank } from '../QuestionComponent/QuestionFormBlank';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            variant="outlined"
            size="small"
            color="error"
            sx={{
                paddingInline: '24px',
                width: '70%',
            }}
            startIcon={<DeleteForeverIcon color="error" />}
            onClick={onClick}
        >
            Видалити
        </Button>
    );
}

export function QuestionSelect() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelectedOption = (option: string) => {
        setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
    };

    const handleRemoveOption = (index: number) => {
        setSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = [...prevSelectedOptions];
            updatedOptions.splice(index, 1);
            return updatedOptions;
        });
    };

    return (
        <Stack>
            <DropUpQuestionMenu onOptionSelect={handleSelectedOption} />
            <Stack>
                {selectedOptions.map((option, index) => (
                    <Stack key={index}>
                        {option === 'single' && (
                            <Stack>
                                <QuestionFormSingleMultiple key={index} type="single" />
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => handleRemoveOption(index)} />
                                </Stack>
                            </Stack>
                        )}
                        {option === 'multiple' && (
                            <Stack>
                                <QuestionFormSingleMultiple key={index} type="multiple" />
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => handleRemoveOption(index)} />
                                </Stack>
                            </Stack>
                        )}
                        {option === 'binary' && (
                            <Stack>
                                <QuestionFormBinary key={index} />
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => handleRemoveOption(index)} />
                                </Stack>
                            </Stack>
                        )}
                        {option === 'blank' && (
                            <Stack>
                                <QuestionFormBlank key={index} />
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => handleRemoveOption(index)} />
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}
