import { getIssues, createIssue, getIssue, updateIssue, deleteIssue } from './IssueApi';
import API from './api'

describe('IssueApi', () => {

    describe('getIssues', () => {
        it('should fetch all issues', async () =>{
            const spy = jest.spyOn(API, 'get');
            const expectedResponse = {}
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await getIssues();
    
            expect(spy).toHaveBeenCalledWith('/issues')
            expect(result).toBe(expectedResponse)
        });
        it('should log an error', async () =>{
            const apiGetspy = jest.spyOn(API, 'get');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'myError';
            apiGetspy.mockRejectedValueOnce(expectedError)
            await getIssues();
    
            expect(apiGetspy).toHaveBeenCalledWith('/issues')
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });

    })
    describe('createIssue', () => {
        it('should create issues', async () =>{
            const spy = jest.spyOn(API, 'post');
            const issueData = {}
            const expectedResponse = {}
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await createIssue(issueData);
    
            expect(spy).toHaveBeenCalledWith('/issues', issueData )
            expect(result).toBe(expectedResponse)
        });
        it('should log an error of issues', async () =>{
            const apiGetspy = jest.spyOn(API, 'post');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'Error1';
            const issueData = {}
            apiGetspy.mockRejectedValueOnce(expectedError)
            await createIssue(issueData);
    
            expect(apiGetspy).toHaveBeenCalledWith('/issues', issueData )
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });
    })
    describe('getIssue', () => {
        it('should fetch all issue', async () =>{
            const spy = jest.spyOn(API, 'get');
            const expectedResponse = {};
            const id = 100;
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await getIssue(id);
    
            expect(spy).toHaveBeenCalledWith('/issues/' + id)
            expect(result).toBe(expectedResponse)
        });
        it('should log an error of an issue', async () =>{
            const apiGetspy = jest.spyOn(API, 'get');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'Error2';
            const id = 100;
            apiGetspy.mockRejectedValueOnce(expectedError)
            await getIssue(id);
    
            expect(apiGetspy).toHaveBeenCalledWith('/issues/' + id)
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });

    })
  
    describe('updateIssue', () => {
        it('should fetch all issue', async () =>{
            const spy = jest.spyOn(API, 'patch');
            const expectedResponse = {};
            const id = 200;
            const updatedIssueData = {}
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await updateIssue(id, updatedIssueData);
    
            expect(spy).toHaveBeenCalledWith('/issues/' + id, updatedIssueData)
            expect(result).toBe(expectedResponse)
        });
        it('should log an error of an issue', async () =>{
            const apiGetspy = jest.spyOn(API, 'patch');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'Error3';
            const id = 200;
            const updatedIssueData = {}
            apiGetspy.mockRejectedValueOnce(expectedError)
            await updateIssue(id, updatedIssueData);
    
            expect(apiGetspy).toHaveBeenCalledWith('/issues/' + id, updatedIssueData)
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });

    })
    describe('deleteIssue', () => {
        it('should fetch all issue', async () =>{
            const spy = jest.spyOn(API, 'delete');
            const expectedResponse = {};
            const id = 100;
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await deleteIssue(id);
    
            expect(spy).toHaveBeenCalledWith('/issues/' + id)
            expect(result).toBe(expectedResponse)
        });
        it('should log an error of an issue', async () =>{
            const apiGetspy = jest.spyOn(API, 'delete');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'Error2';
            const id = 100;
            apiGetspy.mockRejectedValueOnce(expectedError)
            await deleteIssue(id);
    
            expect(apiGetspy).toHaveBeenCalledWith('/issues/' + id)
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });

    })
})