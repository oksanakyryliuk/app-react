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

export function apiUpdateCategory(data: Category) {
    return httpClient({
        method: 'put', // Assuming 'put' is the correct HTTP method for updating a category
        url: `Category/${data.id}`, // Use the appropriate URL for updating a specific category
        data,
    })
        .then((response) => {
            // Log the entire response
            console.log('Response from apiUpdateCategory:', response);

            // Return the response data, or process it as needed
            return response.data;
        });
}

export function apiDeleteCategory(categoryId: number) {
    return httpClient({
        method: 'delete',
        url: `Category/${categoryId}`, // Use the appropriate URL for deleting a specific category
    })
        .then((response) => {
            // Log the entire response
            console.log('Response from apiDeleteCategory:', response);

            // Return the response data, or process it as needed
            return response.data;
        });
}
export const apiGetCategories = (): Promise<Category[]> => {
    return httpClient<Category[]>({
        method: 'get',
        url: 'Category',
    }).then(({ data }) => data);
};

