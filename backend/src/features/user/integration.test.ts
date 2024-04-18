import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../app";
import { User } from "../../database/models/user";

describe("User Routes", () => {
  describe("GET /user", () => {
    it("returns status code 200 alongside current user info excluding password", async () => {
      const user = {
        email: "aaa@aaa.com",
        password: "aaaaaaaa",
      };
      let res = await request(app).post("/auth/register").send(user);
      res = await request(app)
        .get("/user")
        .set("Cookie", res.headers["set-cookie"][0]);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          email: user.email,
          provider: "local",
        })
      );
      expect(res.body).toEqual(
        expect.not.objectContaining({
          password: user.password,
        })
      );
    });
  });
  describe("PUT /", () => {
    it("returns status code 200 and updated user info", async () => {
      const user = {
        email: "aaa@aaa.com",
        password: "aaaaaaaa",
      };
      const updatedInfo: Partial<User> = {
        name: "AAA",
        bio: "My name is AAA, Nice to meet you",
        phone: "+22 (22) 22222-2222",
      };
      let res = await request(app).post("/auth/register").send(user);
      res = await request(app)
        .put("/user")
        .set("Cookie", res.headers["set-cookie"][0])
        .send(updatedInfo);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          ...updatedInfo,
          email: user.email,
          provider: "local",
        })
      );
    });
  });
});
