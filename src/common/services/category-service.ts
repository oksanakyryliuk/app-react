import { httpClient } from '../http-client';
import {AuthResponse, CategoryDTO, LoginDTO, Training,Category, User} from "../types";


export function apiCreateCategory(data: CategoryDTO)  {
    return httpClient<User>({
        method: 'post',
        url: 'Category',
        data,
    })
        .then((response) => {
            // Log the entire response
            console.log('Response from apiLogin:', response);

            // Return the response data, or process it as needed
            return response.data;
        });
// .then( ({ data }) => { data });
}

export const apiGetCategories = (): Promise<Category[]> => {
    return httpClient<Category[]>({
        method: 'get',
        url: 'Category',
    }).then(({ data }) => data);
};

