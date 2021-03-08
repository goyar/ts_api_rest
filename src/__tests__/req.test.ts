import {app, server } from "../app"
import * as request from "supertest"
import { User } from "../models/User"

let v = "/v1";

describe("GET /", () => {
    it("should return a status code of 200", async (done) => {
        let result = await request.agent(app).get(v + "/");
        expect(result.status).toBe(200);
        server.close();
        done();
    });
    it("should accept application/json content-type", async (done) => {
        const result = await request.agent(app).get(v + "/").set('Content-Type', 'application/json');
        expect(result.status).toBe(200);
        server.close();
        done();
    });
    it("should reject with 500 if content/type is set to other than application/json", async (done) => {
        const result = await request.agent(app).get(v + "/").set('Content-Type', 'text/html');
        expect(result.status).toBe(300);
        server.close();
        done();
    });
});

describe("POST /users", () => {
    it("should allow to register a new user", async (done) => {
        const testUser = new User("Gonzalo", "gonzalo.oyarce@gmail.com");
        const result = await request.agent(app).post("/v1/users").set('Content-Type', 'application/json').send(testUser);
        expect(result.status).toBe(201);
        expect(result.body.id).toBeTruthy();
        server.close();
        done();
    });
    it("should fail to register a new user if no user is set", async (done) => {
        const result = await request.agent(app).post("/v1/users").set('Content-Type', 'application/json').send();
        expect(result.status).toBe(400);
        server.close();
        done();
    });
});