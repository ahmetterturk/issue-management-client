import {
  signupUser,
  loginUser,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
} from './UserApi';
import API from './api';

describe('UserApi', () => {
  describe('signupUser', () => {
    it('should signup user', async () => {
      const spy = jest.spyOn(API, 'post');
      const userObject = {};
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await signupUser(userObject);

      expect(spy).toHaveBeenCalledWith('/user/signup', userObject);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of signed up user', async () => {
      const apiGetspy = jest.spyOn(API, 'post');
      const expectedError = { response: 'Error9' };
      const userObject = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      const result = await signupUser(userObject);

      expect(apiGetspy).toHaveBeenCalledWith('/user/signup', userObject);
      expect(result).toBe(expectedError.response);
    });
  });
  describe('loginUser', () => {
    it('should login user', async () => {
      const spy = jest.spyOn(API, 'post');
      const userObject = {};
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await loginUser(userObject);

      expect(spy).toHaveBeenCalledWith('/user/signin', userObject);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of logged user', async () => {
      const apiGetspy = jest.spyOn(API, 'post');
      const expectedError = { response: 'Error10' };
      const userObject = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      const result = await loginUser(userObject);

      expect(apiGetspy).toHaveBeenCalledWith('/user/signin', userObject);
      expect(result).toBe(expectedError.response);
    });
  });
  describe('allUsers', () => {
    it('should fetch all issues', async () => {
      const spy = jest.spyOn(API, 'get');
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await allUsers();

      expect(spy).toHaveBeenCalledWith('/user');
      expect(result).toBe(expectedResponse);
    });
    it('should log an error', async () => {
      const apiGetspy = jest.spyOn(API, 'get');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error11';
      apiGetspy.mockRejectedValueOnce(expectedError);
      await allUsers();

      expect(apiGetspy).toHaveBeenCalledWith('/user');
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });
  describe('singleUser', () => {
    it('should fetch a single user', async () => {
      const spy = jest.spyOn(API, 'get');
      const expectedResponse = {};
      const id = 500;
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await singleUser(id);

      expect(spy).toHaveBeenCalledWith(`/user/${id}`);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of a single user', async () => {
      const apiGetspy = jest.spyOn(API, 'get');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error2';
      const id = 600;
      apiGetspy.mockRejectedValueOnce(expectedError);
      await singleUser(id);

      expect(apiGetspy).toHaveBeenCalledWith(`/user/${id}`);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });
  describe('updateUser', () => {
    it('should fetch updates user', async () => {
      const spy = jest.spyOn(API, 'patch');
      const expectedResponse = {};
      const id = 800;
      const userObject = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await updateUser(userObject, id);

      expect(spy).toHaveBeenCalledWith(`/user/${id}`, userObject);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of updated user', async () => {
      const apiGetspy = jest.spyOn(API, 'patch');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error3';
      const id = 900;
      const userObject = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      await updateUser(userObject, id);

      expect(apiGetspy).toHaveBeenCalledWith(`/user/${id}`, userObject);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });

  describe('deleteUser', () => {
    it('should fetch all issue', async () => {
      const spy = jest.spyOn(API, 'delete');
      const expectedResponse = {};
      const id = 1000;
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await deleteUser(id);

      expect(spy).toHaveBeenCalledWith(`/user/${id}`);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of an issue', async () => {
      const apiGetspy = jest.spyOn(API, 'delete');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error2';
      const id = 1100;
      apiGetspy.mockRejectedValueOnce(expectedError);
      await deleteUser(id);

      expect(apiGetspy).toHaveBeenCalledWith(`/user/${id}`);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });

  describe('uploadProfileImage', () => {
    it('should return response of successful API call', async () => {
      const spy = jest.spyOn(API, 'post');
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const myImage = 'some-image-url';
      const result = await uploadProfileImage({ image: myImage });

      expect(result).toBe(expectedResponse);
      const formObject = spy.mock.calls[0][1];
      expect(formObject.get('image')).toBe(myImage)
    });
    it('should log an error of an issue', async () => {
      const apiPostspy = jest.spyOn(API, 'post');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error2';
      apiPostspy.mockRejectedValueOnce(expectedError);
      await uploadProfileImage({ image: '' });

      expect(apiPostspy).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });
});
