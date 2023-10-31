import React from 'react';
import {List, ListItem} from "@mui/material";
import {Question} from "../../../common/types";
import QuestionUpdatedCardSelect from "./QuestionUpdatedCardSelect";

export const QuestionUpdateCardList = ({ questions }: {questions: Array<Question>}) => {
    return (
        <List>
            {questions.map((question, index) => (
                <ListItem style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                    <QuestionUpdatedCardSelect key={index} question={question} questionIndex={index}/>
                </ListItem>
            ))}
        </List>
    );
};
