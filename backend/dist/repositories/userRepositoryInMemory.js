"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryInMemory = void 0;
const crypto_1 = require("crypto");
class UserRepositoryInMemory {
    #users = [];
    constructor() { }
    getAllUsers() {
        return this.#users;
    }
    async findByEmailWithPassword(email) {
        return this.#users.filter((u) => u.email === email)[0];
    }
    async findByEmail(email) {
        let user = await this.findByEmailWithPassword(email);
        user.password = undefined;
        delete user.password;
        return user;
    }
    async findById(id) {
        return this.#users.filter((u) => u.id === id)[0];
    }
    async create(newUserInfo) {
        const newUser = {
            id: (0, crypto_1.randomUUID)(),
            ...newUserInfo,
        };
        this.#users.push(newUser);
        return newUser;
    }
    async update(id, updatedFields) {
        let user = this.findById(id);
        user = {
            ...user,
            ...updatedFields,
        };
        return user;
    }
}
exports.UserRepositoryInMemory = UserRepositoryInMemory;
