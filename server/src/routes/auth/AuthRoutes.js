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
const consoleLogEndpoints_1 = require("../../common/consoleLogEndpoints");
const consoleLogTerminal_1 = require("../../common/consoleLogTerminal");
const UserModel_1 = require("../../models/UserModel");
const validateEmailAddress_1 = require("../../validation/validateEmailAddress");
const validateUsername_1 = require("../../validation/validateUsername");
const validatePassword_1 = require("../../validation/validatePassword");
exports.ROUTER = express_1.default.Router();
exports.ROUTER.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, consoleLogEndpoints_1.consoleLogEndpoints)(req.body, req.originalUrl, req.method);
    const data = {
        response: 'FAILURE',
        message: ''
    };
    let responseStatus = 500;
    let found = false;
    const { loginName, password } = req.body;
    try {
        const users = yield UserModel_1.UserModel.find();
        users.forEach((user) => {
            if (found === false) {
                if (user.username === loginName || user.email === loginName) {
                    found = true;
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
    (0, consoleLogEndpoints_1.consoleLogEndpoints)(req.body, req.originalUrl, req.method);
    const email = yield (0, validateEmailAddress_1.validateEmailAddress)(req.body.email);
    const username = yield (0, validateUsername_1.validateUserName)(req.body.username);
    const password = yield (0, validatePassword_1.validatePassword)(req.body.password);
    const formErrors = [];
    const formFields = [
        email,
        username,
        password
    ];
    formFields.forEach((field) => {
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
        (0, consoleLogTerminal_1.returnInfoOnTerminal)(`User ${newUser.username} has been successfully registered.`);
        res.status(201).json(newUserObject);
    }
    else {
        // console.log( email.error )
        res.status(401).json({ errors: formErrors });
    }
}));
