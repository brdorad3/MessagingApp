"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message_get = exports.message_post = void 0;
const user_1 = __importDefault(require("../models/user"));
const message_1 = __importDefault(require("../models/message"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_post = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id);
    const user2 = yield user_1.default.findOne({ username: req.body.chat });
    const message = new message_1.default({
        from: user,
        to: user2,
        content: req.body.mess
    });
    yield message.save();
    res.status(200).json(message);
}));
exports.message_post = message_post;
const message_get = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_1.default.find({}).populate("from").populate("to");
    res.json(message);
}));
exports.message_get = message_get;
