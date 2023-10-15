import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Stack,
    TextField,
    Button,
    Typography, InputAdornment,
} from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import PublicIcon from '../common/icons/icon-public-test.png';
import PrivateIcon from '../common/icons/icon-private-test.png';
import CustomSwitch from '../common/components/CustomSwitch';
import { CategoryForm } from '../components/TestComponents/MainForm/CategoryModal/CategoryForm';
import { QuestionForm } from '../components/TestComponents/QuestionComponent/QuestionForm';
import StickyBox from 'react-sticky-box';
import StickyContainer from 'react-sticky-box';
import { TestDTO } from '../common/types';
import { apiGetTestById, apiUpdateTest } from '../common/services/test-service';

export function TestPage() {
    const { testId } = useParams();
    const { register, formState: { isValid }, handleSubmit } = useForm<FieldValues>();
    const [state, setState] = useState({
        public: true,
    });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigate = useNavigate();
    const [testData, setTestData] = useState<TestDTO>({
        title: '',
        description: '',
        duration: 0,
        categories: [],
        isPublic: true,
        status: 'Created',
    });

    useEffect(() => {
        if (testId) {
            apiGetTestById(parseInt(testId))
                .then((data) => {
                    setTestData(data);
                })
                .catch((error) => {
                    console.error('Error fetching test data', error);
                });
        }
    }, [testId]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (testId == null) return;

        const updatedTestData: TestDTO = {
            ...testData,
            title: data.title,
            description: data.description,
            duration: data.duration,
            categories: selectedCategories,
            isPublic: state.public,
            status: 'Created',
        };

        apiUpdateTest(parseInt(testId), updatedTestData)
            .then((response: any) => {
                console.log(response);
                navigate('/test');
            });
    };

    const onSaveCategories = (categories: string[]) => {
        setSelectedCategories(categories);
    };

    return (
        <StickyContainer>
            <StickyBox
                offsetTop={0}
                offsetBottom={0}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: 'white',
                    zIndex: 1,
                    padding: '20px',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Typography variant="h4">Створити новий тест</Typography>
                    <Button variant="contained" color="success" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                        Створити тест
                    </Button>
                </Stack>
            </StickyBox>
            <StickyBox
                style={{
                    background: 'white',
                    paddingBlock: '24px',
                    paddingInline: '68px',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack flexDirection="column" spacing={2}>
                        <Stack sx={{ display: 'inline-flex', flexDirection: 'row' }}>
                            <TextField
                                variant="standard"
                                placeholder="Введіть назву, наприклад, 'Історія України. Первісні часи'"
                                sx={{ width: '40%', marginBottom: '1rem' }}
                                helperText="Назва"
                                {...register('title', { required: true })}
                                value={testData.title}
                                onChange={(event) => {
                                    setTestData((prevTestData) => ({
                                        ...prevTestData,
                                        title: event.target.value,
                                    }));
                                }}
                            />
                            <Stack style={{ marginLeft: 'auto' }}>
                                <TextField
                                    label="Час на виконання"
                                    variant="outlined"
                                    autoFocus
                                    type="number"
                                    value={testData.duration}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">хв</InputAdornment>,
                                    }}
                                    {...register('duration', {
                                        required: true,
                                        validate: (value) => parseInt(value) <= 360,
                                    })}
                                        onChange={(event) => {
                                        setTestData((prevTestData) => ({
                                        ...prevTestData,
                                        duration: parseInt(event.target.value),
                                        }));
                                    }}
                                />
                            </Stack>
                        </Stack>
                        <TextField
                            variant="standard"
                            placeholder="Додайте опис"
                            multiline
                            maxRows={4}
                            sx={{ width: '40%', marginBottom: '1rem' }}
                            helperText="Опис"
                            {...register('description')}
                            value={testData.description}
                            onChange={(event) => {
                                setTestData((prevTestData) => ({
                                    ...prevTestData,
                                    description: event.target.value,
                                }));
                            }}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            direction: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: '16px',
                            marginBottom: '16px',
                        }}
                        direction="row"
                    >
                        <CategoryForm onSaveCategories={onSaveCategories} />
                        <CustomSwitch
                            options={[
                                {
                                    label: 'Публічний',
                                    value: testData.isPublic,
                                    imageIcon: <img src={PublicIcon} alt="Public" width="32" height="32" />,
                                },
                                {
                                    label: 'Приватний',
                                    value: !testData.isPublic,
                                    imageIcon: <img src={PrivateIcon} alt="Private" width="32" height="32" />,
                                },
                            ]}
                            onChange={(value) => {
                                setState({ ...state, public: value });
                            }}
                            size="small"
                        />
                    </Stack>
                </form>
                <Stack>
                    <QuestionForm />
                </Stack>
            </StickyBox>
        </StickyContainer>
    );
}
