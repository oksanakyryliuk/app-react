import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Typography
} from "@mui/material";
import { blue } from "@mui/material/colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Test } from "../../common/types";
import CategoryChip from "./PreviewComponent/CategoryChip";

interface TestCardProps {
    testData: Test;
}

const TestCardMainInfo = ({ testData }: TestCardProps) => {
    const parseDateTimeString = (dateTimeString: string) => {
        const [datePart] = dateTimeString.split('T');
        const [year, month, day] = datePart.split('-').map(Number);

        return new Date(year, month - 1, day);
    };

    const formatDate = (inputDate: string) => {
        let date = parseDateTimeString(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }

    return (
        <Card elevation={0} style={{width:'100%'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }}>
                        <AccountCircleIcon />
                    </Avatar>
                }
                title={`Власник: ${testData.owner.name}`}
                subheader={`Додано: ${formatDate(testData.createdAt.toLocaleString())}`}
                sx={{ paddingInline: '68px', marginTop: '12px' }}
            />
            <CardContent >
                <Stack sx={{ paddingInline: '48px' }}>
                    <Typography variant="button">{testData.title}</Typography>
                    <Typography variant="subtitle2">{testData.description}</Typography>
                    <Typography variant="subtitle2">Час на виконання: {testData.duration} хв</Typography>
                </Stack>
                <Stack sx={{ paddingInline: '42px', paddingTop: '4px' }}>
                    {(testData.id !== 0) && (
                        <CategoryChip testId={testData.id} />
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default TestCardMainInfo;
