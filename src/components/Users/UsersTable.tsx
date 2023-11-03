import React, { useState } from 'react';
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

interface UsersTableProps {
  users: any[];
  // updateCategory: (category: Category) => void;
  deleteUsers: (userId: number) => void;
}

function UsersTable({ users, deleteUsers }: UsersTableProps) {
  const [editableId, setEditableId] = useState<number | null>(null);
  // const [editedCategoryTitle, setEditedCategoryTitle] = useState('');

  // const handleEditCategory = (categoryId: number, title: string) => {
  //   setEditableCategoryId(categoryId);
  //   setEditedCategoryTitle(title);
  // };

  // const handleSaveCategory = () => {
  //   if (editableCategoryId !== null) {
  //     updateCategory({ id: editableCategoryId, title: editedCategoryTitle });
  //     setEditableCategoryId(null);
  //   }
  // };

  const handleCancelEdit = () => {
    setEditableId(null);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEditedCategoryTitle(e.target.value);
  // };

  return (
      <div>
        <h2>Users</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    {/*<TableCell>*/}
                    {/*  {editableCategoryId === category.id ? (*/}
                    {/*      <TextField*/}
                    {/*          type="text"*/}
                    {/*          value={editedCategoryTitle}*/}
                    {/*          onChange={handleInputChange}*/}
                    {/*      />*/}
                    {/*  ) : (*/}
                    {/*      category.title*/}
                    {/*  )}*/}

                    {/*</TableCell>*/}
                    {/*<TableCell>*/}
                    {/*  {editableCategoryId === category.id ? (*/}
                    {/*      <>*/}
                    {/*        <Button onClick={handleSaveCategory}>Save</Button>*/}
                    {/*        <Button onClick={handleCancelEdit}>Cancel</Button>*/}
                    {/*      </>*/}
                    {/*  ) : (*/}
                    {/*      <Button onClick={() => handleEditCategory(category.id, category.title)}>*/}
                    {/*        Edit*/}
                    {/*      </Button>*/}
                    {/*  )}*/}
                    {/*</TableCell>*/}
                    <TableCell>
                      {editableId !== user.id && (
                          <Button onClick={() => deleteUsers(user.id)}>Delete</Button>
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

export default UsersTable;