"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const set_cookie_parser_1 = require("set-cookie-parser");
const app_1 = require("../../app");
(0, vitest_1.describe)("Auth routes", () => {
    (0, vitest_1.describe)("/register", () => {
        (0, vitest_1.it)("returns status code 201 and access token, and sets up cookie when registering", async () => {
            const res = await (0, supertest_1.default)(app_1.app).post("/auth/register").send({
                email: "aaa@aaa.com",
                password: "aaaaaaaa",
            });
            (0, vitest_1.expect)(res.statusCode).toBe(201);
            const cookie = (0, set_cookie_parser_1.parse)(res.headers["set-cookie"][0])[0];
            (0, vitest_1.expect)(cookie.name).toBe("token");
            (0, vitest_1.expect)(res.body.accessToken).toBe(cookie.value);
        });
        (0, vitest_1.it)("returns status code 409 and error message when registering with same email twice", async () => {
            const user = {
                email: "aaa@aaa.com",
                password: "aaaaaaaa",
            };
            await (0, supertest_1.default)(app_1.app).post("/auth/register").send(user);
            const res = await (0, supertest_1.default)(app_1.app).post("/auth/register").send(user);
            (0, vitest_1.expect)(res.statusCode).toBe(409);
            (0, vitest_1.expect)(res.body.message).toBe(`User with email ${user.email} already exists`);
        });
    });
    (0, vitest_1.describe)("/login", () => {
        (0, vitest_1.it)("returns status code 200 and accessToken, and sets up cookie when logging in", async () => {
            const user = {
                email: "aaa@aaa.com",
                password: "aaaaaaaa",
            };
            // First create user
            await (0, supertest_1.default)(app_1.app).post("/auth/register").send(user);
            // Then use it to log in
            const res = await (0, supertest_1.default)(app_1.app).post("/auth/login").send(user);
            (0, vitest_1.expect)(res.statusCode).toBe(200);
            const cookie = (0, set_cookie_parser_1.parse)(res.headers["set-cookie"][0])[0];
            (0, vitest_1.expect)(cookie.name).toBe("token");
            (0, vitest_1.expect)(res.body.accessToken).toBe(cookie.value);
        });
        (0, vitest_1.it)("returns status code 403 if email or password is wrong", async () => {
            const user = {
                email: "aaa@aaa.com",
                password: "aaaaaaaa",
            };
            await (0, supertest_1.default)(app_1.app).post("/auth/register").send(user);
            let res = await (0, supertest_1.default)(app_1.app)
                .post("/auth/login")
                .send({
                ...user,
                email: "wrong@email.com",
            });
            (0, vitest_1.expect)(res.statusCode).toBe(403);
            res = await (0, supertest_1.default)(app_1.app)
                .post("/auth/login")
                .send({
                ...user,
                password: "wrongPassword",
            });
            (0, vitest_1.expect)(res.statusCode).toBe(403);
        });
    });
    (0, vitest_1.describe)("/logout", () => {
        (0, vitest_1.it)("returns status code 403 if not signed in", async () => {
            const res = await (0, supertest_1.default)(app_1.app).post("/auth/logout");
            (0, vitest_1.expect)(res.statusCode).toBe(403);
        });
        (0, vitest_1.it)("returns status code 200 and removes cookie when successfull", async () => {
            let res = await (0, supertest_1.default)(app_1.app).post("/auth/register").send({
                email: "aaa@aaa.com",
                password: "aaaaaaaa",
            });
            res = await (0, supertest_1.default)(app_1.app)
                .post("/auth/logout")
                .set("Cookie", res.headers["set-cookie"][0]);
            (0, vitest_1.expect)(res.statusCode).toBe(200);
            // check if cookie was removed
            const resCookie = (0, set_cookie_parser_1.parse)(res.headers["set-cookie"][0])[0];
            (0, vitest_1.expect)(resCookie.name).toBe("token");
            (0, vitest_1.expect)(resCookie.value).toBe("");
        });
    });
});
