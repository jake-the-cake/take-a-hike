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
exports.ROUTER = void 0;
const express_1 = __importDefault(require("express"));
const UserModel_1 = require("../../models/UserModel");
const validateEmailAddress_1 = require("../../validation/validateEmailAddress");
exports.ROUTER = express_1.default.Router();
exports.ROUTER.get('/', (req, res) => {
    res.send('dont end up here');
});
exports.ROUTER.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {};
    try {
        const users = yield UserModel_1.UserModel.find();
        console.log(users);
    }
    catch (err) {
        console.error(data);
    }
    res.status(201).json({
        request: req.body
    });
}));
exports.ROUTER.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = yield (0, validateEmailAddress_1.validateEmailAddress)(req.body.email);
    console.log(email);
    if (!email.error) {
        const newUserObject = {
            username: req.body.username,
            email: email.value,
            password: req.body.password
        };
        const x = new UserModel_1.UserModel(newUserObject);
        x.save();
        res.status(201).json(newUserObject);
    }
    else {
        console.log(email.error);
        res.status(401).json(email.error);
    }
}));
