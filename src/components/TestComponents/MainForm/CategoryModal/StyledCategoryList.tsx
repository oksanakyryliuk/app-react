import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Stack } from '@mui/material';
import FixedButtons from './FixedButtons';
import { Category } from '../../../../common/types';
import { apiGetCategories } from '../../../../common/services/category-service';
import { useParams } from 'react-router-dom';
import { apiGetCategoriesForTest } from '../../../../common/services/test-service';

const StyledCategoryList = ({ open, onSave, onClose }: { open: boolean; onSave: (selectedCategories: string[]) => void; onClose: () => void }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const { testId } = useParams();

    useEffect(() => {
        if (open) {
            loadCategories();
        } else {
            setCategories([]);
        }
    }, [open]);

    useEffect(() => {
        if (categories.length > 0) {
            const isAnyCategorySelected = selectedCategories.length > 0;
            setIsSaveButtonDisabled(!isAnyCategorySelected);
        }
    }, [categories, selectedCategories]);

    const loadCategories = () => {
        apiGetCategories().then((loadedCategories) => {
            setCategories(loadedCategories);
            if (testId) {
                apiGetCategoriesForTest(parseInt(testId)).then((categoriesForTest: Category[]) => {
                    const selectedCategoryTitles = categoriesForTest.map((category) => category.title);
                    setSelectedCategories(selectedCategoryTitles);
                });
            }
        });
    };

    const handleToggle = (categoryTitle: string) => {
        if (selectedCategories.includes(categoryTitle)) {
            setSelectedCategories(selectedCategories.filter((title) => title !== categoryTitle));
        } else {
            setSelectedCategories([...selectedCategories, categoryTitle]);
        }
    };

    const handleSaveCategories = () => {
        onSave(selectedCategories);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <List sx={{ flexGrow: 1 }}>
                {categories.map((category) => (
                    <ListItem
                        key={category.id}
                        onClick={() => handleToggle(category.title)}
                        sx={{ backgroundColor: selectedCategories.includes(category.title) ? '#90caf9' : 'white' }}
                    >
                        <ListItemText primary={category.title} />
                    </ListItem>
                ))}
            </List>
            <Stack>
                <FixedButtons
                    isSaveButtonDisabled={isSaveButtonDisabled}
                    onSave={handleSaveCategories}
                    onCancel={onClose}
                />
            </Stack>
        </Box>
    );
};

export default StyledCategoryList;
