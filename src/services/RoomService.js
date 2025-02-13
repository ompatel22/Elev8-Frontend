import { httpClient } from "../config/AxiosHelper";

export const createRoomApi = async (roomDetail) => {
  const respone = await httpClient.post(`/rooms`, roomDetail, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return respone.data;
};

export const joinChatApi = async () => {
  const response = await httpClient.get(`/rooms/chat`);
  return response.data;
};

export const getMessagess = async (roomId, size = 50, page = 0) => {
  console.log(roomId);
  const response = await httpClient.get(
    `/rooms/${roomId}/messages?size=${size}&page=${page}`
  );
  console.log(response.data);
  
  return response.data;
};
