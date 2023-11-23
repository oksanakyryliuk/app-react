import React, { useState, useEffect } from 'react';
import { apiGetPublicTests } from '../common/services/test-service';
import {
    Container, TextField,
    Typography, Paper, IconButton,  InputBase,  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TestList from "../components/TestComponents/PreviewComponent/TestList";
import { Test } from "../common/types";
import ButtonAppBar from "../layouts/someting/nav";

export function GeneralTestsPage() {
    const [tests, setTests] = useState<Test[]>([]);

    useEffect(() => {
        apiGetPublicTests().then((tests: Test[]) => setTests(tests));
    }, []);

    return (
        <div>
        <ButtonAppBar></ButtonAppBar>
        <Container>
            <Paper
                component="form"
                sx={{ p: '10px ', margin:'10px 70px', display: 'flex', alignItems: 'center', width: 1000 }}
            >

                <TextField   sx={{ ml: 2, flex: 1 }}

                             id="filled-basic" label="Search"
                             variant="standard" />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                </IconButton>
            </Paper>

            <Container style={{ margin: "20px 20px" }}>
                <Typography></Typography>
            </Container>
            <TestList tests={tests}/>
        </Container>
        </div>
    );
}
