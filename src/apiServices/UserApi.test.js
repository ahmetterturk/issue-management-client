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

// Tests for UserApi module
describe('UserApi', () => {
  // Tests for signupUser function
  describe('signupUser', () => {
    it('should signup user', async () => {
      // We spy on API.post to validate if it was called later on
      const spy = jest.spyOn(API, 'post');
      const userObject = {};
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await signupUser(userObject);

      // We expect our spy to be called with /user/signup and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith('/user/signup', userObject);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of signed up user', async () => {
      // We spy on API.post to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'post');
      const expectedError = { response: 'Error9' };
      const userObject = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      const result = await signupUser(userObject);

      // We expect our spy to be called with /user/signup and for the error
      // to be returned by the function.
      expect(apiGetspy).toHaveBeenCalledWith('/user/signup', userObject);
      expect(result).toBe(expectedError.response);
    });
  });

  // Tests for function loginUser
  describe('loginUser', () => {
    it('should login user', async () => {
      // We spy on API.post to validate if it was called later on
      const spy = jest.spyOn(API, 'post');
      const userObject = {};
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await loginUser(userObject);

      // We expect our spy to be called with /user/signin and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith('/user/signin', userObject);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of logged user', async () => {
      // We spy on API.post to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'post');
      const expectedError = { response: 'Error10' };
      const userObject = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      const result = await loginUser(userObject);

      // We expect our spy to be called with /user/signup and for the error
      // to be returned by the function.
      expect(apiGetspy).toHaveBeenCalledWith('/user/signin', userObject);
      expect(result).toBe(expectedError.response);
    });
  });

  // Tests for function allUsers
  describe('allUsers', () => {
    it('should fetch all users', async () => {
      // We spy on API.get to validate if it was called later on
      const spy = jest.spyOn(API, 'get');
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await allUsers();

      // We expect our spy to be called with /user and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith('/user');
      expect(result).toBe(expectedResponse);
    });
    it('should log an error', async () => {
      // We spy on API.get to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'get');
      const expectedError = { response: 'Error11' };
      apiGetspy.mockRejectedValueOnce(expectedError);
      const result = await allUsers();

      // We expect our spy to be called with /user and for the error
      // to be returned by the function.
      expect(apiGetspy).toHaveBeenCalledWith('/user');
      expect(result).toBe(expectedError.response);
    });
  });

  // Tests for function singleUser
  describe('singleUser', () => {
    it('should fetch a single user', async () => {
      // We spy on API.get to validate if it was called later on
      const spy = jest.spyOn(API, 'get');
      const expectedResponse = {};
      const id = 500;
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await singleUser(id);

      // We expect our spy to be called with /user/500 and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith(`/user/${id}`);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of a single user', async () => {
      // We spy on API.get to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'get');
      const expectedError = { response: 'Error2' };
      const id = 600;
      apiGetspy.mockRejectedValueOnce(expectedError);
      const result = await singleUser(id);

      // We expect our spy to be called with /user/600 and for the error
      // to be returned by the function.
      expect(apiGetspy).toHaveBeenCalledWith(`/user/${id}`);
      expect(result).toBe(expectedError.response);
    });
  });

  // Tests for updateUser
  describe('updateUser', () => {
    it('should fetch updates user', async () => {
      // We spy on API.patch to validate if it was called later on
      const spy = jest.spyOn(API, 'patch');
      const expectedResponse = {};
      const id = 800;
      const userObject = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await updateUser(userObject, id);

      // We expect our spy to be called with /user/800 and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith(`/user/${id}`, userObject);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of updated user', async () => {
      // We spy on API.patch to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'patch');
      const expectedError = { response: 'Error3' };
      const id = 900;
      const userObject = {};
      apiGetspy.mockRejectedValueOnce(expectedError);
      const result = await updateUser(userObject, id);

      // We expect our spy to be called with /user/900 and for the error
      // to be returned by the function.
      expect(apiGetspy).toHaveBeenCalledWith(`/user/${id}`, userObject);
      expect(result).toBe(expectedError.response);
    });
  });

  // Tests for deleteUser
  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // We spy on API.delete to validate if it was called later on
      const spy = jest.spyOn(API, 'delete');
      const expectedResponse = {};
      const id = 1000;
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const result = await deleteUser(id);

      // We expect our spy to be called with /user/1000 and for the response
      // to be the mocked response
      expect(spy).toHaveBeenCalledWith(`/user/${id}`);
      expect(result).toBe(expectedResponse);
    });
    it('should log an error of an issue', async () => {
      // We spy on API.delete to validate if it was called later on
      const apiGetspy = jest.spyOn(API, 'delete');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error2';
      const id = 1100;
      apiGetspy.mockRejectedValueOnce(expectedError);
      await deleteUser(id);

      // We expect our spy to be called with /user/1100 and for the error
      // to be returned by the function.
      expect(apiGetspy).toHaveBeenCalledWith(`/user/${id}`);
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });

  // Tests for uploadProfileImage
  describe('uploadProfileImage', () => {
    it('should return response of successful API call', async () => {
      // We spy on API.post to validate if it was called later on
      const spy = jest.spyOn(API, 'post');
      const expectedResponse = {};
      spy.mockResolvedValueOnce({ data: expectedResponse });
      const myImage = 'some-image-url';
      const result = await uploadProfileImage({ image: myImage });

      // We expect the result to be the expected mocked response and for
      // the form object to include our image object.
      expect(result).toBe(expectedResponse);
      const formObject = spy.mock.calls[0][1];
      expect(formObject.get('image')).toBe(myImage);
    });
    it('should log an error of an issue', async () => {
      // We spy on API.post to validate if it was called later on
      const apiPostspy = jest.spyOn(API, 'post');
      const consoleLogSpy = jest.spyOn(console, 'log');
      const expectedError = 'Error2';
      apiPostspy.mockRejectedValueOnce(expectedError);
      await uploadProfileImage({ image: '' });

      // We expect our spy to have been called and for the expected error
      // to have been logged by checking the console log spy.
      expect(apiPostspy).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError);
    });
  });
});
