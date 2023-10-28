import React, { useState, useEffect } from 'react';
import { Chip, Stack } from "@mui/material";
import { Category } from "../../../common/types";
import { apiGetCategoriesForTest } from "../../../common/services/test-service";

interface CategoryChipProps {
    testId: number;
}

const CategoryChip = ({ testId }: CategoryChipProps) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [categoryColors, setCategoryColors] = useState<Record<string, string>>({});
    const palette = [
        '#132043', '#1F4172', '#2F4858', '#940B92',
        '#610C9F', '#4caf50', '#DA0C81', '#FFAD05',
        '#cddc39', '#E95793', '#C70039', '#141E46'
    ];
    let colorIndex = 0;

    useEffect(() => {
        try {
            apiGetCategoriesForTest(testId).then((categoriesForTest: Category[]) => {
                const selectedCategoryTitles = categoriesForTest.map((category) => category.title);
                setCategories(selectedCategoryTitles);

                // Генерувати та зберігати кольори для кожної категорії
                const newCategoryColors: Record<string, string> = {};
                selectedCategoryTitles.forEach((category) => {
                    // Використовувати кольори з палітри по черзі
                    newCategoryColors[category] = palette[colorIndex];
                    colorIndex = (colorIndex + 1) % palette.length;
                });

                setCategoryColors(newCategoryColors);
            });
        } catch (error) {
            console.error('Помилка при створенні або оновленні тесту', error);
        }
    }, [testId]);

    return (
        <Stack direction="row" spacing={1}>
            {categories.map((category) => (
                <Chip
                    key={category}
                    label={category}
                    style={{
                        color: categoryColors[category],
                        borderColor: categoryColors[category],
                    }}
                    variant="outlined"
                />
            ))}
        </Stack>
    );
};

export default CategoryChip;
