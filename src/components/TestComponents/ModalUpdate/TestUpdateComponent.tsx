import React from 'react';
import {
    TextField,
    Stack,
    InputAdornment,
} from '@mui/material';
import PublicIcon from '../../../common/icons/icon-public-test.png';
import PrivateIcon from '../../../common/icons/icon-private-test.png';
import {CategoryForm} from "../MainForm/CategoryModal/CategoryForm";
import CustomSwitch from "../../../common/components/CustomSwitch";
import {TestDTO} from "../../../common/types";

interface TestUpdateComponentProps {
    testData: TestDTO;
    onTestDataChange: (updatedData: TestDTO) => void;
    onSaveCategories: (categories: string[]) => void;
}

function TestUpdateComponent({ testData, onTestDataChange, onSaveCategories }: TestUpdateComponentProps) {
    return (
        <Stack
            style={{
                paddingBlock: '24px',
                paddingInline: '68px',
                margin: '10px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                position: 'relative'
            }}
        >
            <Stack flexDirection="column" spacing={2}>
                <Stack sx={{ display: 'inline-flex', flexDirection: 'row' }}>
                    <TextField
                        variant="standard"
                        placeholder="Введіть назву, наприклад, 'Історія України. Первісні часи'"
                        sx={{ width: '40%', marginBottom: '1rem' }}
                        helperText="Назва"
                        value={testData.title}
                        onChange={(event) => {
                            onTestDataChange({
                                ...testData,
                                title: event.target.value,
                            });
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
                            onChange={(event) => {
                                onTestDataChange({
                                    ...testData,
                                    duration: parseInt(event.target.value),
                                });
                            }}
                        />
                    </Stack>
                </Stack>
                <TextField
                    variant="standard"
                    placeholder="Додайте опис (опціонально)"
                    multiline
                    maxRows={4}
                    sx={{ width: '40%', marginBottom: '1rem' }}
                    helperText="Опис"
                    value={testData.description}
                    onChange={(event) => {
                        onTestDataChange({
                            ...testData,
                            description: event.target.value,
                        });
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
                        onTestDataChange({ ...testData, isPublic: value });
                    }}
                    size="small"
                />
            </Stack>
        </Stack>
    );
}

export default TestUpdateComponent;
