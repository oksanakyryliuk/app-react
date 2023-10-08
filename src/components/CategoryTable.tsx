import React, { useState } from 'react';
import { Category } from '../common/types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';

interface CategoryTableProps {
  categories: Category[];
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: number) => void;
}

function CategoryTable({ categories, updateCategory, deleteCategory }: CategoryTableProps) {
  const [editableCategoryId, setEditableCategoryId] = useState<number | null>(null);
  const [editedCategoryTitle, setEditedCategoryTitle] = useState('');

  const handleEditCategory = (categoryId: number, title: string) => {
    setEditableCategoryId(categoryId);
    setEditedCategoryTitle(title);
  };

  const handleSaveCategory = () => {
    if (editableCategoryId !== null) {
      updateCategory({ id: editableCategoryId, title: editedCategoryTitle });
      setEditableCategoryId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditableCategoryId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCategoryTitle(e.target.value);
  };

  return (
      <div>
        <h2>Categories</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Action</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {editableCategoryId === category.id ? (
                          <TextField
                              type="text"
                              value={editedCategoryTitle}
                              onChange={handleInputChange}
                          />
                      ) : (
                          category.title
                      )}
                    </TableCell>
                    <TableCell>
                      {editableCategoryId === category.id ? (
                          <>
                            <Button onClick={handleSaveCategory}>Save</Button>
                            <Button onClick={handleCancelEdit}>Cancel</Button>
                          </>
                      ) : (
                          <Button onClick={() => handleEditCategory(category.id, category.title)}>
                            Edit
                          </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {editableCategoryId !== category.id && (
                          <Button onClick={() => deleteCategory(category.id)}>Delete</Button>
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

export default CategoryTable;