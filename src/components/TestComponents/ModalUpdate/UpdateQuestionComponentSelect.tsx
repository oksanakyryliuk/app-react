import React from 'react';
import { Stack } from '@mui/material';
import { QuestionDto } from "../../../common/types";
import { QuestionFormSingleMultiple } from '../MainForm/QuestionComponent/QuestionFormSingleMultiple';
import { QuestionFormBlank } from "../MainForm/QuestionComponent/QuestionFormBlank";
import { QuestionFormBinary } from "../MainForm/QuestionComponent/QuestionFormBinary";

interface UpdateQuestionSelectProps {
    questionDto: QuestionDto;
    questionId: number;
    onUpdateQuestionDto: (updatedQuestionDto: QuestionDto) => void;
}

export function UpdateQuestionComponentSelect({ questionDto, questionId, onUpdateQuestionDto }: UpdateQuestionSelectProps) {
    return (
        <Stack>
            {questionDto.type === 'single' && (
                <QuestionFormSingleMultiple
                    questionIndex={questionId}
                    type="single"
                    onSaveData={(formData) => onUpdateQuestionDto(formData)}
                    questionDto={questionDto}
                />
            )}
            {questionDto.type === 'multiple' && (
                <QuestionFormSingleMultiple
                    questionIndex={questionId}
                    type="multiple"
                    onSaveData={(formData) => onUpdateQuestionDto(formData)}
                    questionDto={questionDto}
                />
            )}
            {questionDto.type === 'binary' && (
                <QuestionFormBinary
                    questionIndex={questionId}
                    onSaveData={(formData) => onUpdateQuestionDto(formData)}
                    questionDto={questionDto}
                />
            )}
            {questionDto.type === 'blank' && (
                <QuestionFormBlank
                    questionIndex={questionId}
                    onSaveData={(formData) => onUpdateQuestionDto(formData)}
                    questionDto={questionDto}
                />
            )}
        </Stack>
    );
}
