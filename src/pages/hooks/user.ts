import {apiDeleteUsers, apiGetUsers} from "../../common/services/auth-service";


export function useUsers() {

    const loadUsers = () => {
        apiGetUsers().then(users => (users));
    };

    const deleteUsers = (userId: number) => {
        apiDeleteUsers(userId)
            .then(() => {
                loadUsers();
            })
            .catch((error) => {
                console.error('Error deleting user: ', error);
            });
    };

    return {deleteUsers}
}