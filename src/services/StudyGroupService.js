import { httpClient } from "../config/AxiosHelper"

export const getAllStudyGroups = async () => {
    const response = await httpClient.get(`/study_group/get-all-study-groups`);
    console.log(response);

    return response.data;
};

export const getMessagesOfAStudyGroup = async (studyGroupName, size = 50, page = 0) => {
    console.log(studyGroupName);
    const response = await httpClient.get(
        `/study_group/${studyGroupName}/messages?size=${size}&page=${page}`
    );
    if (response) {
        console.log(response.data);
    }
    else {
        console.log("no data");

    }

    return response.data;
};

