import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;
let headers: { Authorization: string };

describe("Create category controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}','admin','admin@rentx.com','${password}', true,'now()', 'DRIVER')`
        );

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin",
        });

        const { token } = responseToken.body;

        headers = {
            Authorization: `Bearer ${token}`,
        };
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category supertest description",
            })
            .set(headers);

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with the same name", async () => {
        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category supertest description",
            })
            .set(headers);

        expect(response.status).toBe(400);
    });
});
