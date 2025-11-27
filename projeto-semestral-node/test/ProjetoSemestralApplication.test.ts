import request from 'supertest';
import app from '../src/app';

describe('ProjetoSemestralApplication', () => {
    it('should return a 200 status for the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    // Add more tests as needed for other endpoints and functionalities
});