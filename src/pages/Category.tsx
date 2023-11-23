import React, { useState, useEffect } from 'react';
import {apiGetCategories} from "../common/services/category-service";
import {Category, CategoryDTO} from "../common/types";
import {useCategories} from "./hooks/category";
import ButtonAppBar from "../layouts/someting/nav";
import {Container} from '@mui/material';
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
// import CategoryHooks from './hooks/category'
//
export function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const {updateCategory, createCategory, deleteCategory} = useCategories();

    useEffect(() => {
        loadCategories(); // Функція для завантаження категорій при першому завантаженні компонента
    }, []);

    const loadCategories = () => {
        apiGetCategories().then(categories => setCategories(categories));
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