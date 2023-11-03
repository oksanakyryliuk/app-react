import React, { useState, useEffect } from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryTable from '../components/CategoryTable';
import axios from 'axios';
import {apiGetCategories} from "../common/services/category-service";
import {Category, CategoryDTO, User} from "../common/types";
import {apiCreateCategory, apiUpdateCategory, apiDeleteCategory} from "../common/services/category-service";
import ButtonAppBar from "../layouts/someting/nav";
import {Container} from "@mui/material";
import {apiDeleteUsers, apiGetUsers} from "../common/services/auth-service";
import UsersTable from "../components/Users/UsersTable";

export function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
      loadUsers(); // Функція для завантаження категорій при першому завантаженні компонента
  }, []);

  const loadUsers = () => {
      apiGetUsers().then(users => setUsers(users));
      console.log(users)
  };

  // const createCategory = (newCategory: CategoryDTO) => {
  //   apiCreateCategory(newCategory)
  //       .then(() => {
  //         // Після успішного створення категорії оновлюємо список
  //           loadUsers();
  //       })
  //       .catch((error) => {
  //         console.error('Error creating category: ', error);
  //       });
  // };

  // const updateCategory = (categoryToUpdate: Category) => {
  //   apiUpdateCategory(categoryToUpdate)
  //       .then(() => {
  //         loadCategories();
  //       })
  //       .catch((error) => {
  //         console.error('Error updating category: ', error);
  //       });
  // };

  const deleteUsers = (userId: number) => {
    apiDeleteUsers(userId)
        .then(() => {
          loadUsers();
        })
        .catch((error) => {
          console.error('Error deleting user: ', error);
        });
  };


  return (
      <div>
          <ButtonAppBar></ButtonAppBar>
          <Container>
      <div style={{ margin: "10px 20px" }}>
        <h1 style={{textAlign:"center"}}>Users Manager</h1>
        <UsersTable
            users={users}
            deleteUsers={deleteUsers}
          />
      </div>
          </Container>
      </div>
  );
}