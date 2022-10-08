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
const UserModel_1 = require("../models/UserModel");
const globals_1 = require("@jest/globals");
const axios_1 = __importDefault(require("axios"));
const consoleLogTerminal_1 = require("../common/consoleLogTerminal");
const validateEmailAddress_1 = require("../validation/validateEmailAddress");
const noUser = new UserModel_1.UserModel({ email: '' });
const goodUser = new UserModel_1.UserModel({ email: 'email@address.com' });
const badUser = new UserModel_1.UserModel({ email: 'a%v.,12 *@f@g @h.j..k(?.coooooooooo' });
const testUsersEmailArray = [
    noUser.email,
    goodUser.email,
    badUser.email
];
const [noEmail, goodEmail, badEmail] = testUsersEmailArray;
const allUsers = axios_1.default.get('http://localhost:4200/users/all').then((response) => {
    return response.data;
}).catch((err) => {
    (0, consoleLogTerminal_1.returnErrorOnTerminal)(err.message);
    return { error: err.message };
});
(0, globals_1.describe)('Email address validation', () => {
    it('Should exist', () => {
        (0, globals_1.expect)(goodEmail).not.toBeUndefined();
        (0, globals_1.expect)(noEmail).toBeFalsy();
    });
    it('Should be unique', () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield allUsers;
        const duplicates = [];
        const noDuplicates = [];
        data.forEach(({ email }) => {
            if (email === goodEmail)
                duplicates.push(email);
            if (email === badEmail)
                noDuplicates.push(email);
        });
        (0, globals_1.expect)(duplicates.length > 0).toBeTruthy();
        (0, globals_1.expect)(noDuplicates.length > 0).toBeFalsy();
    }));
    (0, globals_1.describe)('Should be formatted correctly', () => {
        it('Should only have 1 @ symbol', () => {
            testUsersEmailArray.forEach((email) => {
                console.log(email);
                const { error } = (0, validateEmailAddress_1.validateEmailAt)({ error: undefined, value: '' }, email);
                console.log(error);
                if (email === goodEmail) {
                    (0, globals_1.expect)(error).toBeUndefined();
                }
                else if (email === badEmail) {
                    (0, globals_1.expect)(error).not.toBeUndefined();
                }
            });
        });
        it('Should not have consecutive dots', () => {
            testUsersEmailArray.forEach((email) => {
                console.log(email);
                const { error } = (0, validateEmailAddress_1.ValidateEmailDot)({ error: undefined, value: '' }, email);
                console.log(error);
                if (email === goodEmail) {
                    (0, globals_1.expect)(error).toBeUndefined();
                }
                else if (email === badEmail) {
                    (0, globals_1.expect)(error).not.toBeUndefined();
                }
            });
        });
    });
});
