import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { QuestionDto } from "../../../common/types";
import { UpdateQuestionComponentSelect } from "./UpdateQuestionComponentSelect";
import {apiUpdateQuestion} from "../../../common/services/question-service";

interface UpdateDialogProps {
    open: boolean;
    onCancel: () => void;
    questionDto: QuestionDto;
    questionId: number;
}

function UpdateDialog({ open, onCancel, questionDto, questionId }: UpdateDialogProps) {
    const [updatedQuestionDto, setUpdatedQuestionDto] = useState(questionDto);

    const handleUpdateQuestionDto = (updatedQuestionDto: QuestionDto) => {
        setUpdatedQuestionDto(updatedQuestionDto); // Оновлення стану відображеного об'єкта
    };

    const updateQuestion = () => {
        console.log("question", questionDto);

        if (updatedQuestionDto) {
            apiUpdateQuestion(questionId, updatedQuestionDto)
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                });
        }
    }

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth={"lg"}>
            <DialogContent>
                <UpdateQuestionComponentSelect
                    questionDto={updatedQuestionDto}
                    questionId={questionId}
                    onUpdateQuestionDto={handleUpdateQuestionDto}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="error">
                    Скасувати
                </Button>
                <Button onClick={() => updateQuestion()} color="success">
                    Підтвердити
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateDialog;
