import React, { useState } from 'react';
import { Stack, Button } from '@mui/material';
import { DropUpQuestionMenu } from './DropUpQuestionMenu';
import { QuestionFormSingleMultiple } from './QuestionComponent/QuestionFormSingleMultiple';
import { QuestionFormBinary } from './QuestionComponent/QuestionFormBinary';
import { QuestionFormBlank } from './QuestionComponent/QuestionFormBlank';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { QuestionDto } from "../../../common/types";

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
    )
}

interface QuestionSelectProps {
    setQuestions: (updateFunction: (prevQuestions: QuestionDto[]) => QuestionDto[]) => void;
}

export function QuestionSelect({ setQuestions: updateQuestions }: QuestionSelectProps) {
    const [selectedOptions, setSelectedOptions] = useState<{ type: string; data: QuestionDto; }[]>([]);

    const handleSelectedOption = (option: string) => {
        const newIndex = selectedOptions.length;

        setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, { type: option, data: { type: '', title: '', description: '', q_image: null, answers: [] } }]);

        handleAddQuestion(newIndex, { type: option, title: '', description: '', q_image: null, answers: [] });
    };

    const handleRemoveOption = (index: number) => {
        setSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = [...prevSelectedOptions];
            updatedOptions.splice(index, 1);
            return updatedOptions;
        });
    };

    const handleAddQuestion = (index: number, formData: QuestionDto) => {
        updateQuestions((prevQuestions: QuestionDto[]) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = formData;
            return updatedQuestions;
        });

        setSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = [...prevSelectedOptions];
            updatedOptions[index].data = formData;
            return updatedOptions;
        });
    };

    const handleRemoveQuestion = (index: number) => {
        updateQuestions((prevQuestions: QuestionDto[]) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions.splice(index, 1);
            return updatedQuestions;
        });

        setSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = [...prevSelectedOptions];
            updatedOptions.splice(index, 1);
            return updatedOptions;
        });
    };

    return (
        <Stack>
            <Stack>
                {selectedOptions.map((option, index) => (
                    <Stack key={index}>
                        {option.type === 'single' && (
                            <Stack>
                                <QuestionFormSingleMultiple key={index} type="single" questionIndex={index} onSaveData={(formData) => handleAddQuestion(index, formData)} />
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => {
                                        handleRemoveOption(index);
                                        handleRemoveQuestion(index);
                                    }} />
                                </Stack>
                            </Stack>
                        )}
                        {option.type === 'multiple' && (
                            <Stack>
                                <QuestionFormSingleMultiple key={index} questionIndex={index} type="multiple" onSaveData={(formData) => handleAddQuestion(index, formData)}/>
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => {
                                        handleRemoveOption(index);
                                        handleRemoveQuestion(index);
                                    }} />
                                </Stack>
                            </Stack>
                        )}
                        {option.type === 'binary' && (
                            <Stack>
                                <QuestionFormBinary key={index} questionIndex={index} onSaveData={(formData) => handleAddQuestion(index, formData)} />
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => {
                                        handleRemoveOption(index);
                                        handleRemoveQuestion(index);
                                    }} />
                                </Stack>
                            </Stack>
                        )}
                        {option.type === 'blank' && (
                            <Stack>
                                <QuestionFormBlank key={index} questionIndex={index} onSaveData={(formData) => handleAddQuestion(index, formData)} />
                                <Stack sx={{ marginBlock: '4px', alignItems: 'center' }}>
                                    <DeleteButton onClick={() => {
                                        handleRemoveOption(index);
                                    }} />
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                ))}
            </Stack>
            <DropUpQuestionMenu onOptionSelect={handleSelectedOption} />
        </Stack>
    );
}
