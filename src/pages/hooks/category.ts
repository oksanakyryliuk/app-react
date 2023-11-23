import {Category, CategoryDTO} from "../../common/types";
import {
    apiCreateCategory,
    apiDeleteCategory,
    apiGetCategories,
    apiUpdateCategory
} from "../../common/services/category-service";

export function useCategories() {
    const loadCategories = () => {
        apiGetCategories().then(categories => (categories));
    };

    const createCategory = (newCategory: CategoryDTO) => {
        apiCreateCategory(newCategory)
            .then(() => {
                // Після успішного створення категорії оновлюємо список
                loadCategories();
            })
            .catch((error) => {
                console.error('Error creating category: ', error);
            });
    };

    const updateCategory = (categoryToUpdate: Category) => {
        apiUpdateCategory(categoryToUpdate)
            .then(() => {
                loadCategories();
            })
            .catch((error) => {
                console.error('Error updating category: ', error);
            });
    };

    const deleteCategory = (categoryId: number) => {
        apiDeleteCategory(categoryId)
            .then(() => {
                loadCategories();
            })
            .catch((error) => {
                console.error('Error deleting category: ', error);
            });
    };

    return {deleteCategory, createCategory, updateCategory}

}