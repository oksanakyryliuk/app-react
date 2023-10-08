import React, { useState, useEffect } from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryTable from '../components/CategoryTable';
import axios from 'axios';
import {apiGetCategories} from "../common/services/category-service";
import {Category, CategoryDTO} from "../common/types";
import {apiCreateCategory} from "../common/services/category-service";
//
// export function CategoryPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//
//   useEffect(() => {
//     apiGetCategories().then(categories => setCategories(categories));
//   }, []);
//
//
//   return (
//     <div style={{margin: "10px 20px"}}>
//       <h1>Category Manager</h1>
//       <CategoryForm />
//       <CategoryTable categories={categories} />
//     </div>
//   );
// }


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

  return (
      <div style={{ margin: "10px 20px" }}>
        <h1>Category Manager</h1>
        <CategoryForm createCategory={createCategory} />
        <CategoryTable categories={categories} />
      </div>
  );
}