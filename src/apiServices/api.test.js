import {apiRequestInterceptor} from './api';
import { currentUser } from '../testUtils/WithProviders';

describe('api', () => {
    
    it('should add Authorization header when user details are present', () => {
        localStorage.setItem('user', JSON.stringify(currentUser));
        const request  = {
            headers: {}
        }
        apiRequestInterceptor(request);

        expect(request.headers.Authorization).toBeTruthy();
    })
})