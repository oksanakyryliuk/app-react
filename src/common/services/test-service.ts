import { httpClient } from '../http-client';
import { TestDTO, Test, User, Category } from "../types";

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

export async function apiUpdateTest(id: number, data: TestDTO) {
    const response = await httpClient<User>({
        method: 'put',
        url: `Test/${id}`,
        data,
    });
    console.log('Response from apiUpdateTest:', response);
    return response.data;
}


export const apiGetTests = async (): Promise<Test[]> => {
    const {data} = await httpClient<Test[]>({
        method: 'get',
        url: 'Test',
    });
    return data;
};

export const apiGetTestById = async (id: number): Promise<Test> => {
    const response = await httpClient.get<Test>(`Test/${id}`);
    return response.data;
};

export const apiDeleteTestById = async (id: number): Promise<void> => {
    await httpClient.delete(`Test/${id}`);
};

export const apiGetCategoriesForTest = async (id: number): Promise<Category[]> => {
    const response = await httpClient.get<Category[]>(`/TestCategory/${id}`);
    return response.data;
};
