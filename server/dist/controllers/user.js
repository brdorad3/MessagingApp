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
exports.update_contacts = exports.fetch_user_data = exports.add_contact = exports.about_post = exports.register_get = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const multer = require('multer');
const register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("w");
}));
exports.register = register;
const register_get = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("kontakt");
}));
exports.register_get = register_get;
const about_post = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.about_me = req.body.about;
        yield user.save();
        res.status(200).json({ about_me: user.about_me });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.about_post = about_post;
const add_contact = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({ username: req.body.search });
    user.length > 0 ? res.send(user) : res.send([]);
}));
exports.add_contact = add_contact;
const fetch_user_data = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id).populate("contacts");
    res.send(user);
}));
exports.fetch_user_data = fetch_user_data;
const update_contacts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id);
    const user2 = yield user_1.default.find({ username: req.body.contactInfo[0].username });
    const contactId = user2[0]._id;
    if (!(user === null || user === void 0 ? void 0 : user.contacts.includes(contactId))) {
        user === null || user === void 0 ? void 0 : user.contacts.push(contactId);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json(user);
    }
    else {
        res.status(400).json({ message: 'Contact already exists' });
    }
}));
exports.update_contacts = update_contacts;
