import React, { useState, useEffect } from 'react';
// import ButtonAppBar from "../layouts/someting/nav";
import {Container} from "@mui/material";
import {apiDeleteUsers, apiGetUsers} from "../common/services/auth-service";
import UsersTable from "../components/Users/UsersTable";
import {useUsers} from "./hooks/user";

export function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        apiGetUsers().then(users => setUsers(users));
        console.log(users)
    };

    const { deleteUsers } = useUsers();

    return (
        <div>
            <Container>
                <div style={{margin: "10px 20px"}}>
                    <h1 style={{textAlign: "center"}}>Users Manager</h1>
                    <UsersTable
                        users={users}
                        deleteUsers={deleteUsers}
                    />
                </div>
            </Container>
        </div>
    );
}