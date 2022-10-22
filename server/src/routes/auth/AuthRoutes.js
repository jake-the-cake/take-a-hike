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
    const data = {
        response: 'FAILURE',
        message: ''
    };
    let responseStatus = 500;
    const { loginName, password } = req.body;
    try {
        const users = yield UserModel_1.UserModel.find();
        users.forEach((user) => {
            if (user.username === loginName || user.email === loginName) {
                if (password === user.password) {
                    data.response = 'SUCCESS';
                    responseStatus = 201;
                }
                else {
                    data.message = 'Invalid password entered';
                    responseStatus = 401;
                }
            }
            else {
                data.message = 'User does not exist';
                responseStatus = 403;
            }
        });
    }
    catch (err) {
        data.message = 'An error has occured on the server';
        console.error(err.message);
    }
    res.status(responseStatus).json(data);
}));
exports.ROUTER.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = yield (0, validateEmailAddress_1.validateEmailAddress)(req.body.email);
    console.log(email);
    const formErrors = [];
    const formFields = [
        email
    ];
    formFields.forEach((field) => {
        console.log(field);
        if (field.error)
            formErrors.push(field);
    });
    if (formErrors.length === 0) {
        const newUserObject = {
            username: req.body.username || 'defaultuser',
            email: email.value,
            password: req.body.password || 'Password1'
        };
        const newUser = new UserModel_1.UserModel(newUserObject);
        newUser.save();
        res.status(201).json(newUserObject);
    }
    else {
        // console.log( email.error )
        res.status(401).json({ errors: formErrors });
    }
}));
