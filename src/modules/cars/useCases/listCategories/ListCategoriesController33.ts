import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;
let headers: { Authorization: string };

describe("List Categories Controller", () => {
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

    it("should be able to list all categories", async () => {
        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest description",
            })
            .set(headers);

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");
    });
});
