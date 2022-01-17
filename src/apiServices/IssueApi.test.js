import {
  getIssues,
  createIssue,
  getIssue,
  updateIssue,
  deleteIssue,
} from './IssueApi';
import API from './api';

// Test for IssueApi module
describe('IssueApi', () => {
  // All tests for the getIssues function
  describe('getIssues', () => {
    it('should fetch all issues', async () => {
      // We spy on API.get to validate if it was called later on
      const spy = jest.spyOn(API, 'get');
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await getIssues();

      // We expect our spy to be called with /issues and for the response
      // to be the mocked response.
      expect(spy).toHaveBeenCalledWith('/issues');
      expect(result).toBe(expectedResponse);
    });
    it('should log an error', async () => {
      // We spy on API.get to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'get');
      const expectedError = 'myError';
      apiGetspy.mockRejectedValueOnce({ response: expectedError });
      const result = await getIssues();

      // We expect our spy to be called with /issues and for the response
      // to be the thrown error.
      expect(apiGetspy).toHaveBeenCalledWith('/issues');
      expect(result).toBe(expectedError);
    });
  });
  // All tests for the getIssues function
  describe('createIssue', () => {
    it('should create issues', async () => {
      // We spy on API.post to validate if it was called later on
      const spy = jest.spyOn(API, 'post');
      const issueData = {};
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await createIssue(issueData);

      // We expect our spy to be called with /issues and for the response
      // to be the mocked response.
      expect(spy).toHaveBeenCalledWith('/issues', issueData);
      expect(result).toBe(expectedResponse);
    });
    it('should return an error when creation fails', async () => {
      // We spy on API.post to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'post');
      const expectedError = 'Error1';
      const issueData = {};
      apiGetspy.mockRejectedValueOnce({ response: expectedError });
      const result = await createIssue(issueData);

      // We expect our spy to be called with /issues and for the response
      // to be the thrown error.
      expect(apiGetspy).toHaveBeenCalledWith('/issues', issueData);
      expect(result).toBe(expectedError);
    });
  });
  // All tests for the getIssue function
  describe('getIssue', () => {
    it('should fetch one issue', async () => {
      // We spy on API.get to validate if it was called later on
      const spy = jest.spyOn(API, 'get');
      const expectedResponse = {};
      const id = 100;
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await getIssue(id);

      // We expect our spy to be called with /issues/100 and for the response
      // to be the mocked response.
      expect(spy).toHaveBeenCalledWith('/issues/100');
      expect(result).toBe(expectedResponse);
    });
    it('should return an error when fetching an issue', async () => {
      // We spy on API.get to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'get');
      const expectedError = 'Error2';
      const id = 100;
      apiGetspy.mockRejectedValueOnce({ response: expectedError });
      const result = await getIssue(id);

      // We expect our spy to be called with /issues and for the response
      // to be the thrown error.
      expect(apiGetspy).toHaveBeenCalledWith(`/issues/${id}`);
      expect(result).toBe(expectedError);
    });
  });

  // All tests for the updateIssue function
  describe('updateIssue', () => {
    it('should update an issue', async () => {
      // We spy on API.patch to validate if it was called later on
      const spy = jest.spyOn(API, 'patch');
      const expectedResponse = {};
      const id = 200;
      const updatedIssueData = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await updateIssue(id, updatedIssueData);

      // We expect our spy to be called with /issues/200 and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith(`/issues/${id}`, updatedIssueData);
      expect(result).toBe(expectedResponse);
    });

    it('should log an error of an issue', async () => {
      // We spy on API.patch to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'patch');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error3';
      const id = 200;
      const updatedIssueData = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      await updateIssue(id, updatedIssueData);

      // We expect our spy to be called with /issues and for the error
      // to be logged.
      expect(apiGetspy).toHaveBeenCalledWith(`/issues/${id}`, updatedIssueData);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });
  // All tests for the deleteIssue function
  describe('deleteIssue', () => {
    it('should delete an issue', async () => {
      // We spy on API.delete to validate if it was called later on
      const spy = jest.spyOn(API, 'delete');
      const expectedResponse = {};
      const id = 100;
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await deleteIssue(id);

      // We expect our spy to be called with /issues/100 and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith(`/issues/${id}`);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of an issue', async () => {
      // We spy on API.delete to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'delete');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error2';
      const id = 100;
      apiGetspy.mockRejectedValueOnce(expectedError);
      await deleteIssue(id);

      // We expect our spy to be called with /issues and for the error
      // to be logged.
      expect(apiGetspy).toHaveBeenCalledWith(`/issues/${id}`);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });
});
