import {QuestionDto, QuestionType, User} from "../types";
import httpClient from "../http-client";

export const apiGetQuestionTypes = async (): Promise<QuestionType[]> => {
    const {data} = await httpClient<QuestionType[]>({
        method: 'get',
        url: 'QuestionType',
    });
    return data;
};

export function apiCreateQuestion(testId: number, data: QuestionDto[])  {
    return httpClient<User>({
        method: 'post',
        url: `Question/${testId}`,
        data,
    })
        .then((response) => {
            // Log the entire response
            console.log('Response from apiQuestion:', response);

            // Return the response data, or process it as needed
            return response.data;
        });
}