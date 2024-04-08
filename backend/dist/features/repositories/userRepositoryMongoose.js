"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryMongoose = void 0;
const user_1 = require("../models/user");
class UserRepositoryMongoose {
    constructor() { }
    findByEmailWithPassword(email) {
        return user_1.UserModel.findOne({ email }).select("+password").exec();
    }
    findByEmail(email) {
        return user_1.UserModel.findOne({ email }).exec();
    }
    findById(id) {
        return user_1.UserModel.findById(id).select({ _id: 0, __v: 0 }).exec();
    }
    create(newUser) {
        return user_1.UserModel.create(newUser);
    }
    update(id, updatedFields) {
        return user_1.UserModel.findByIdAndUpdate(id, {
            $set: updatedFields,
        }, { returnDocument: "after" }).exec();
    }
}
exports.UserRepositoryMongoose = UserRepositoryMongoose;
