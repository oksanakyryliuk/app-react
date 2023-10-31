import {Question, QuestionDto, QuestionType, User} from "../types";
import httpClient from "../http-client";

export const apiGetQuestionTypes = async (): Promise<QuestionType[]> => {
    const {data} = await httpClient<QuestionType[]>({
        method: 'get',
        url: 'QuestionType',
    });
    return data;
};

export async function apiCreateQuestion(testId: number, data: QuestionDto[]) {
    let response = await httpClient<User>({
        method: 'post',
        url: `Question/${testId}`,
        data,
    });
    console.log('Response from apiQuestion:', response);
    return response.data;
}

export const apiGetQuestionsByTest = async (testId: number): Promise<Question[]> => {
    const {data} = await httpClient.get<Question[]>(`Question/getByTest/${testId}`)
    return data;
};

export const apiDeleteQuestionById = async (id: number): Promise<void> => {
    await httpClient.delete(`Question/${id}`);
};

export async function apiUpdateQuestion(id: number, data: QuestionDto) {
    const response = await httpClient<User>({
        method: 'put',
        url: `Question/${id}`,
        data,
    });
    return response.data;
}