import * as React from 'react';
import {apiGetCategories} from "../common/services/category-service";
import {useState} from "react";
import {Category} from "../common/types";
import {getUser} from "../common/services/auth-service";
import {useAuth} from "../auth/hooks/useAuth";
import {useEffect} from "react";
import {Container, TextField, Stack, Typography, Button} from "@mui/material";
import ButtonAppBar from "../layouts/someting/nav";

const ProfilePage = () => {
    const [user, setUser] = useState<any>();
    const {email}=useAuth();

    // useEffect(() => {
    //     // Отримуємо дані користука при завантаженні компонента
    //     getUser(email)
    //         .then(user => {setUser(user);
    //             console.log(user)})
    //         .catch(error => console.error("Помилка отримання даних користука", error));
    // }, [email]); // Відстежуємо зміни email

    const loadUsers = () => {
        getUser(email).then(user => setUser(user));
    };

    useEffect(() => {
        loadUsers(); // Функція для завантаження категорій при першому завантаженні компонента
    }, []);

    console.log(user)
    return (
        <div>
        <ButtonAppBar></ButtonAppBar>
<Container  maxWidth="sm" sx={{height: '100% ', marginTop: '30px',}}>
    <h4 style={{textAlign:"center"}}>Редагувати користувача</h4>
    <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
    >

      <Typography>Email</Typography>
    <TextField  variant="outlined"
                // value={user.name}
    />
        <Typography>Name</Typography>
    <TextField variant="outlined"
               // value={user.email}
    />

        <Typography>Role</Typography>
        <TextField variant="outlined"
                   // value={user.role}
        />

        <Button variant="contained" type="submit" >Edit</Button>
</Stack>

</Container>
        </div>
    );
};

export default ProfilePage;
