import * as supertest from "supertest";
import { describe, expect, it } from "@jest/globals";

describe("User account", () => {
  it("should login with a valid user", async () => {
    const test = await supertest("http://localhost:8080")
      .post("/auth")
      .send({
        email: "jest@teste.com",
        password: "test",
      })
      .expect(200);

    expect(typeof test.body.message).toBe("string");
    expect(typeof test.body.token).toBe("string");
  });

  it("error in the try of invalid user login", async () => {
    const test = await supertest("http://localhost:8080")
      .post("/auth")
      .send({
        email: "error@teste.com",
        password: "test",
      })
      .expect(404);

    expect(test.body.message).toBe("User not found!");
  });
});
