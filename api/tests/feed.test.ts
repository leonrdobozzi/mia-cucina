import * as supertest from "supertest";
import { describe, expect, it } from "@jest/globals";

describe("Create user account", () => {
  it("should create a valid user", async () => {
    const token = await supertest("http://localhost:8080").post("/auth").send({
      email: "jest@teste.com",
      password: "test",
    });

    const test = await supertest("http://localhost:8080")
      .get("/feed")
      .set({ Authorization: `Bearer ${token.body.token}` })
      .expect(200);

    expect(typeof test.body).toBe("object");
    test.body.forEach((item) => {
      expect(typeof item.id).toBe("string");
      expect(typeof item.name).toBe("string");
      expect(typeof item.categoryName).toBe("string");
      expect(typeof item.preparation_time).toBe("string");
      expect(typeof item.dificulty).toBe("string");
      expect(typeof item.revenue).toBe("string");
      expect(typeof item.isPublic).toBe("boolean");
      expect(typeof item.userId).toBe("string");
      expect(typeof item.foodCategoryId).toBe("string");
      expect(typeof item.image).toBe("string");
      expect(typeof item.createdAt).toBe("string");
      expect(typeof item.username).toBe("string");
    });
  });
});
