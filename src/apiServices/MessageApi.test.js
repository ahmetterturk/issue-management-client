import { getAllMessages, createMessage, deleteMessage } from './MessageApi';
import API from './api';

// All tests for MessageApi module
describe('MessageApi', () => {
  // Tests for function getAllMessages
  describe('getAllMessages', () => {
    it('should fetch all messages', async () => {
      // We spy on API.get to validate if it was called later on
      const spy = jest.spyOn(API, 'get');
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await getAllMessages();

      // We expect our spy to be called with /messages and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith('/messages');
      expect(result).toBe(expectedResponse);
    });
    it('should log an error if the fetching fails', async () => {
      // We spy on API.get to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'get');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error6';
      apiGetspy.mockRejectedValueOnce(expectedError);
      await getAllMessages();

      // We expect our spy to be called with /messages and for the error
      // to be logged.
      expect(apiGetspy).toHaveBeenCalledWith('/messages');
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });

  // Tests for function createMessage
  describe('createMessage', () => {
    it('should create a message', async () => {
      // We spy on API.post to validate if it was called later on
      const spy = jest.spyOn(API, 'post');
      const issueData = {};
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await createMessage(issueData);

      // We expect our spy to be called with /messages and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith('/messages', issueData);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error if the creation fails', async () => {
      // We spy on API.post to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'post');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error7';
      const issueData = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      await createMessage(issueData);

      // We expect our spy to be called with /messages and for the error
      // to be logged.
      expect(apiGetspy).toHaveBeenCalledWith('/messages', issueData);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });

  // Tests for function deleteMessage
  describe('deleteMessage', () => {
    it('should delete a message', async () => {
      // We spy on API.delete to validate if it was called later on
      const spy = jest.spyOn(API, 'delete');
      const expectedResponse = {};
      const id = 300;
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await deleteMessage(id);

      // We expect our spy to be called with /messages/300 and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith(`/messages/${id}`);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error if the deletion fails', async () => {
      // We spy on API.delete to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'delete');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error8';
      const id = 300;
      apiGetspy.mockRejectedValueOnce(expectedError);
      await deleteMessage(id);

      // We expect our spy to be called with /messages/300 and for the error
      // to be logged.
      expect(apiGetspy).toHaveBeenCalledWith(`/messages/${id}`);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });
});
