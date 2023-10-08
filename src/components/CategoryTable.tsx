import React, { useEffect } from 'react';
import axios from 'axios';
import {Category} from "../common/types";

function CategoryTable({ categories}: {categories: Array<Category>}) {

  // const handleDeleteClick = async (id: number) => {
  //   try {
  //     // Відправити запит на видалення категорії за id на сервер
  //   //   axios.delete(`http://localhost:5243/api/Category/${id}`);
  //     // Викликати функцію onDeleteCategory для видалення категорії зі списку
  //     onDeleteCategory(id);
  //   } catch (error) {
  //     console.error('Error deleting category:', error);
  //   }
  // };

  // Викликати функцію onDeleteCategory та оновити таблицю при зміні categories
  useEffect(() => {
    // Оновити таблицю, коли зміниться список категорій
  }, [categories]);

  return (
    <div>
      <h2>Categories</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th> {/* Додано стовпчик для кнопки видалення */}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.title}</td>
              <td>
                <button>delete</button>
                {/*<button onClick={() => handleDeleteClick(category.id)}>Delete</button>*/}
              </td>
              <td>
                <button >Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;



