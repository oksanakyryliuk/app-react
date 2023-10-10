import React from 'react';
import TestCard from './TestCard';
import {Test} from "../../common/types";
import {ListItem} from "@mui/material";

export const TestCardList = ({ tests }: {tests: Array<Test>}) => {
    return (
        <ListItem >
            {tests.map((test, index) => (
                <TestCard  key={index} title={test.Title} />
            ))}
        </ListItem>
    );
};

// export default TestCardList;