
import { httpClient } from '../http-client';
import {AuthResponse, TestDTO, Test, User, Category} from "../types";


export function apiCreateTest(data: TestDTO)  {
    return httpClient<User>({
        method: 'post',
        url: 'Test',
        data,
    })
        .then((response) => {
            // Log the entire response
            console.log('Response from apiLogin:', response);

            // Return the response data, or process it as needed
            return response.data;
        });

}

export function apiUpdateTest(id: number, data: TestDTO)  {
    return httpClient<User>({
        method: 'put',
        url: `Test/${id}`,
        data,
    })
        .then((response) => {
            console.log('Response from apiUpdateTest:', response);

            return response.data;
        });
}


export const apiGetTests = (): Promise<Test[]> => {
    return httpClient<Test[]>({
        method: 'get',
        url: 'Test',
    }).then(({ data }) => data);
};

