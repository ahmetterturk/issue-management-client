import { getAllMessages, createMessage, deleteMessage } from './MessageApi';
import API from './api'

describe('MessageApi', () => {
    describe('getAllMessages', () => {
        it('should fetch all messages', async () =>{
            const spy = jest.spyOn(API, 'get');
            const expectedResponse = {}
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await getAllMessages();
    
            expect(spy).toHaveBeenCalledWith('/messages')
            expect(result).toBe(expectedResponse)
        });
        it('should log an error', async () =>{
            const apiGetspy = jest.spyOn(API, 'get');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'Error6';
            apiGetspy.mockRejectedValueOnce(expectedError)
            await getAllMessages();
    
            expect(apiGetspy).toHaveBeenCalledWith('/messages')
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });

    })

    describe('createMessage', () => {
        it('should create a message', async () =>{
            const spy = jest.spyOn(API, 'post');
            const issueData = {}
            const expectedResponse = {}
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await createMessage(issueData);
    
            expect(spy).toHaveBeenCalledWith('/messages', issueData )
            expect(result).toBe(expectedResponse)
        });
        it('should log an error of message', async () =>{
            const apiGetspy = jest.spyOn(API, 'post');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'Error7';
            const issueData = {}
            apiGetspy.mockRejectedValueOnce(expectedError)
            await createMessage(issueData);
    
            expect(apiGetspy).toHaveBeenCalledWith('/messages', issueData )
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });
    })
    describe('deleteMessage', () => {
        it('should fetch all issue', async () =>{
            const spy = jest.spyOn(API, 'delete');
            const expectedResponse = {};
            const id = 300;
            spy.mockResolvedValueOnce({ data: expectedResponse })
            const result = await deleteMessage(id);
    
            expect(spy).toHaveBeenCalledWith('/messages/' + id)
            expect(result).toBe(expectedResponse)
        });
        it('should log an error of an issue', async () =>{
            const apiGetspy = jest.spyOn(API, 'delete');
            const consoleLogSpy = jest.spyOn(console, 'log');
            const expectedError = 'Error8';
            const id = 300;
            apiGetspy.mockRejectedValueOnce(expectedError)
            await deleteMessage(id);
    
            expect(apiGetspy).toHaveBeenCalledWith('/messages/' + id)
            expect(consoleLogSpy).toHaveBeenLastCalledWith(expectedError)
        });

    })





});