import { httpClient } from "../config/AxiosHelper"

export const getAllStudyGroups = async () => {
    const response = await httpClient.get(`/study_group/get-all-study-groups`);
    console.log(response);

    return response.data;
};

