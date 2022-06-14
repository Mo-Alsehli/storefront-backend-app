import app from '../server';
import supertest from 'supertest';

describe("Testing The Server Status", ()=>{
    it("Server Route Should Return A Success Status", ()=>{
        supertest(app).get('/').expect(200);
    });
});