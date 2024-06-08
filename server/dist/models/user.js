"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    confirm: {
        type: String,
    },
    about_me: {
        type: String
    },
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});
userSchema.virtual("url").get(function () {
    return "/" + this._id;
});
exports.default = mongoose_1.default.model('User', userSchema);
