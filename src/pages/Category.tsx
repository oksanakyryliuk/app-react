import React, { useState, useEffect } from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryTable from '../components/CategoryTable';
import axios from 'axios';
import {apiGetCategories} from "../common/services/category-service";
import {Category, CategoryDTO} from "../common/types";
import {apiCreateCategory, apiUpdateCategory, apiDeleteCategory} from "../common/services/category-service";
import ButtonAppBar from "../layouts/someting/nav";
import {Container} from "@mui/material";

export function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories(); // Функція для завантаження категорій при першому завантаженні компонента
  }, []);

  const loadCategories = () => {
    apiGetCategories().then(categories => setCategories(categories));
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


  return (
      <div>
          <ButtonAppBar></ButtonAppBar>
          <Container>
      <div style={{ margin: "10px 20px" }}>
        <h1 style={{textAlign:"center"}}>Category Manager</h1>
        <CategoryForm createCategory={createCategory} />
        <CategoryTable   categories={categories}
                         updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
      </div>
          </Container>
      </div>
  );
}