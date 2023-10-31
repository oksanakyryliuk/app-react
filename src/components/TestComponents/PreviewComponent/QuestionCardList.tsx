import React from 'react';
import {List, ListItem} from "@mui/material";
import {Question} from "../../../common/types";
import QuestionCardSelect from "./QuestionCardSelect";

export const QuestionCardList = ({ questions }: {questions: Array<Question>}) => {
    return (
        <List>
            {questions.map((question, index) => (
                <ListItem style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                    <QuestionCardSelect key={index} question={question} questionIndex={index}/>
                </ListItem>
            ))}
        </List>
    );
};
