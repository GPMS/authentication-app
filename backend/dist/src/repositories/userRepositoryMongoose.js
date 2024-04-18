"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryMongoose = void 0;
const user_1 = require("../database/models/user");
class UserRepositoryMongoose {
    constructor() { }
    findByEmailWithPassword(email) {
        return user_1.userModel.findOne({ email }).select("+password").exec();
    }
    findByEmail(email) {
        return user_1.userModel.findOne({ email }).exec();
    }
    findById(id) {
        return user_1.userModel.findById(id).select({ _id: 0, __v: 0 }).exec();
    }
    create(newUser) {
        return user_1.userModel.create(newUser);
    }
    update(id, updatedFields) {
        return user_1.userModel
            .findByIdAndUpdate(id, {
            $set: updatedFields,
        }, { returnDocument: "after" })
            .exec();
    }
}
exports.UserRepositoryMongoose = UserRepositoryMongoose;
