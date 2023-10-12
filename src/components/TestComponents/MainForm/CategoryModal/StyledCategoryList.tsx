import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Stack } from '@mui/material';
import FixedButtons from './FixedButtons';
import { Category } from '../../../../common/types';
import { apiGetCategories } from '../../../../common/services/category-service';

const StyledCategoryList = ({ open, onSave, onClose }: { open: boolean; onSave: (selectedCategories: string[]) => void; onClose: () => void }) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (open) {
            loadCategories();
        } else {
            setCheckedList([]);
        }
    }, [open]);

    useEffect(() => {
        const isAnyCategorySelected = checkedList.length > 0;
        setIsSaveButtonDisabled(!isAnyCategorySelected);
    }, [checkedList]);

    useEffect(() => {
        if (categories.length > 0) {
            const isAnyCategorySelected = selectedItems.length > 0;
            setIsSaveButtonDisabled(!isAnyCategorySelected);
        }
    }, [categories, selectedItems]);

    const loadCategories = () => {
        apiGetCategories().then((loadedCategories) => {
            setCategories(loadedCategories);
        });
    };

    const handleToggle = (index: number) => {
        const selectedIndex = selectedItems.indexOf(index);
        const newSelected = [...selectedItems];

        if (selectedIndex === -1) {
            newSelected.push(index);
        } else {
            newSelected.splice(selectedIndex, 1);
        }

        setSelectedItems(newSelected);

        const selectedCategories = newSelected.map((index) => categories[index].title);
        setIsSaveButtonDisabled(selectedCategories.length === 0);
    };

    const handleSaveCategories = (selectedCategories: string[]) => {
        onSave(selectedCategories);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <List sx={{ flexGrow: 1 }}>
                {categories.map((category, index) => (
                    <ListItem
                        key={index}
                        onClick={() => handleToggle(index)}
                        sx={{ backgroundColor: selectedItems.indexOf(index) !== -1 ? '#90caf9' : 'white' }}
                    >
                        <ListItemText primary={category.title} />
                    </ListItem>
                ))}
            </List>
            <Stack>
                <FixedButtons
                    isSaveButtonDisabled={isSaveButtonDisabled}
                    onSave={() => {
                        handleSaveCategories(selectedItems.map(index => categories[index].title));
                    }}
                    onCancel={onClose}
                />
            </Stack>
        </Box>
    );
};

export default StyledCategoryList;
