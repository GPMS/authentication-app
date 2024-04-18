import { describe, it, expect } from "vitest";
import request from "supertest";
import { parse as parseCookie } from "set-cookie-parser";

import { app } from "../../app";

describe("Auth routes", () => {
  describe("/register", () => {
    it("returns status code 201 and access token, and sets up cookie when registering", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "aaa@aaa.com",
        password: "aaaaaaaa",
      });

      expect(res.statusCode).toBe(201);

      const cookie = parseCookie(res.headers["set-cookie"][0])[0];
      expect(cookie.name).toBe("token");
      expect(res.body.accessToken).toBe(cookie.value);
    });
    it("returns status code 409 and error message when registering with same email twice", async () => {
      const user = {
        email: "aaa@aaa.com",
        password: "aaaaaaaa",
      };
      await request(app).post("/auth/register").send(user);
      const res = await request(app).post("/auth/register").send(user);

      expect(res.statusCode).toBe(409);
      expect(res.body.message).toBe(
        `User with email ${user.email} already exists`
      );
    });
  });
  describe("/login", () => {
    it("returns status code 200 and accessToken, and sets up cookie when logging in", async () => {
      const user = {
        email: "aaa@aaa.com",
        password: "aaaaaaaa",
      };
      // First create user
      await request(app).post("/auth/register").send(user);
      // Then use it to log in
      const res = await request(app).post("/auth/login").send(user);

      expect(res.statusCode).toBe(200);
      const cookie = parseCookie(res.headers["set-cookie"][0])[0];
      expect(cookie.name).toBe("token");
      expect(res.body.accessToken).toBe(cookie.value);
    });
    it("returns status code 403 if email or password is wrong", async () => {
      const user = {
        email: "aaa@aaa.com",
        password: "aaaaaaaa",
      };
      await request(app).post("/auth/register").send(user);

      let res = await request(app)
        .post("/auth/login")
        .send({
          ...user,
          email: "wrong@email.com",
        });
      expect(res.statusCode).toBe(403);

      res = await request(app)
        .post("/auth/login")
        .send({
          ...user,
          password: "wrongPassword",
        });
      expect(res.statusCode).toBe(403);
    });
  });
  describe("/logout", () => {
    it("returns status code 403 if not signed in", async () => {
      const res = await request(app).post("/auth/logout");
      expect(res.statusCode).toBe(403);
    });
    it("returns status code 200 and removes cookie when successfull", async () => {
      let res = await request(app).post("/auth/register").send({
        email: "aaa@aaa.com",
        password: "aaaaaaaa",
      });
      res = await request(app)
        .post("/auth/logout")
        .set("Cookie", res.headers["set-cookie"][0]);
      expect(res.statusCode).toBe(200);
      // check if cookie was removed
      const resCookie = parseCookie(res.headers["set-cookie"][0])[0];
      expect(resCookie.name).toBe("token");
      expect(resCookie.value).toBe("");
    });
  });
});
