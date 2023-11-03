import React from 'react';

import {Card, CardHeader, Avatar,IconButton, Typography,
    CardContent,
    CardActions,
    Collapse,
 CardMedia
} from "@mui/material";

const TestCard = ({ title }: {title: string}) => {
    return (

    <Card  style={{ margin: '10px' }} sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
                <Avatar  aria-label="recipe">
                    R
                </Avatar>
            }

            title={title}
            subheader="September 14, 2016"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Descriprion test
            </Typography>
        </CardContent>

    </Card>
    );
};

export default TestCard;