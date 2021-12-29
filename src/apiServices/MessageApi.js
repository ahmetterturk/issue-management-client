import API from './api';

export const getAllMessages = async () => {
  try {
    const response = await API.get('/messages');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async (messageData) => {
  try {
    const response = await API.post('/messages', messageData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (id) => {
  try {
    const response = await API.delete(`/messages/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
