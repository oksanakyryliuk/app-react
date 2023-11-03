import Box from '@mui/material/Box';
import { useAuth } from '../auth/hooks/useAuth';
import {Container, Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AppModules } from '../common/enums/AppModules';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonAppBar from "../layouts/someting/nav";
import logo from '../public/homePhoto.jpg'
import logo2 from '../public/ai-machine-learning-hands-of-robot-and-human-touching-big-data-of-global-network-connection.jpg_s1024x1024wisk20cIGXrdzKNqm-aQ-2hfL-8joWV9OXzX9_7BfeKQzU7ds.jpg'
import {GeneralTestsPage} from "../pages/GeneralTestsPage";
import TestList from "../components/TestComponents/PreviewComponent/TestList";
import {apiGetPublicTests} from "../common/services/test-service";
import {Test} from "../common/types";
export const HomePage = () => {
    const [tests, setTests] = useState<Test[]>([]);

    useEffect(() => {
        apiGetPublicTests().then((tests: Test[]) => setTests(tests));
    }, []);

    return (
        <Box>
            <ButtonAppBar></ButtonAppBar>
            <Container style={{ display: 'flex', alignItems: 'center', marginTop: '80px', }}>
                <img style={{ width: '100%' }} src={logo2} alt="Logo" />
                <div style={{ textAlign: 'center', }}>
                    <h3 style={{ textAlign: 'left', marginLeft:"70px", fontFamily: 'Monospace' }}>
                        Ласкаво просимо до нашого сервісу для створення,
                        проходження тестів і опитувань. Використовуйте нашу платформу для легкого створення
                        та аналізу тестових завдань і анкет, щоб покращити навчання та приймати важливі рішення.
                    </h3>
                </div>
            </Container>


        </Box>
    );
};