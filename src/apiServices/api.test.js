import { apiRequestInterceptor } from './api';
import { currentUser } from '../testUtils/WithProviders';

// Tests for api module
describe('api', () => {
  it('should add Authorization header when user details are present', () => {
    // we set up the test with the user configured in local storage
    localStorage.setItem('user', JSON.stringify(currentUser));
    const request = {
      headers: {},
    };
    apiRequestInterceptor(request);

    // we expect the header to have an Authorization header after being processed
    // by the interceptor
    expect(request.headers.Authorization).toBeTruthy();
  });
});
