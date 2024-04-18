"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
(0, vitest_1.describe)("User Routes", () => {
    (0, vitest_1.describe)("GET /user", () => {
        (0, vitest_1.it)("returns status code 200 alongside current user info excluding password", async () => {
            const user = {
                email: "aaa@aaa.com",
                password: "aaaaaaaa",
            };
            let res = await (0, supertest_1.default)(app_1.app).post("/auth/register").send(user);
            res = await (0, supertest_1.default)(app_1.app)
                .get("/user")
                .set("Cookie", res.headers["set-cookie"][0]);
            (0, vitest_1.expect)(res.statusCode).toBe(200);
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                email: user.email,
                provider: "local",
            }));
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.not.objectContaining({
                password: user.password,
            }));
        });
    });
    (0, vitest_1.describe)("PUT /", () => {
        (0, vitest_1.it)("returns status code 200 and updated user info", async () => {
            const user = {
                email: "aaa@aaa.com",
                password: "aaaaaaaa",
            };
            const updatedInfo = {
                name: "AAA",
                bio: "My name is AAA, Nice to meet you",
                phone: "+22 (22) 22222-2222",
            };
            let res = await (0, supertest_1.default)(app_1.app).post("/auth/register").send(user);
            res = await (0, supertest_1.default)(app_1.app)
                .put("/user")
                .set("Cookie", res.headers["set-cookie"][0])
                .send(updatedInfo);
            (0, vitest_1.expect)(res.statusCode).toBe(200);
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                ...updatedInfo,
                email: user.email,
                provider: "local",
            }));
        });
    });
});
