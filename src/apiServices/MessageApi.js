import API from './api';


// make a request to get all messages from server 
export const getAllMessages = async () => {
  try {
    const response = await API.get('/messages');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


// make a post request to create a message and save it in the server 
export const createMessage = async (messageData) => {
  try {
    const response = await API.post('/messages', messageData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


// make a delete request to delete any message by it's id
export const deleteMessage = async (id) => {
  try {
    const response = await API.delete(`/messages/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
