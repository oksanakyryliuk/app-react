import {QuestionType} from "../types";
import httpClient from "../http-client";

export const apiGetQuestionTypes = async (): Promise<QuestionType[]> => {
    const {data} = await httpClient<QuestionType[]>({
        method: 'get',
        url: 'QuestionType',
    });
    return data;
};
