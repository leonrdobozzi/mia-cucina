import * as supertest from "supertest";
import { describe, expect, it } from "@jest/globals";
import { randomUUID } from "crypto";

describe("Create user account", () => {
  it("should create a valid user", async () => {
    const test = await supertest("http://localhost:8080")
      .post("/register")
      .send({
        name: "TestJEST",
        email: `${randomUUID()}@tests.com`,
        password: "test",
      })
      .expect(201);

    expect(typeof test.body.message).toBe("string");
    expect(typeof test.body.user.id).toBe("string");
    expect(typeof test.body.user.name).toBe("string");
    expect(typeof test.body.user.email).toBe("string");
    expect(typeof test.body.user.isPublic).toBe("boolean");
    expect(typeof test.body.user.createdAt).toBe("string");
  });

  it("error at try to create a user", async () => {
    const test = await supertest("http://localhost:8080")
      .post("/register")
      .send({
        name: "TestJEST",
        email: `jest@teste.com`,
        password: "test",
      })
      .expect(400);

    expect(test.body.message).toBe("User already registered!");
  });
});
