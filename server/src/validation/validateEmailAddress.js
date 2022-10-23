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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailAddress = exports.validateUniqueInput = exports.validateEmailDot = exports.validateEmailAt = void 0;
const consoleLogTerminal_1 = require("../common/consoleLogTerminal");
const UserModel_1 = require("../models/UserModel");
const validateEmailAt = (object, input) => {
    if (input.split('@').length !== 2) {
        object.error = {
            message: 'The value provided does not fit the required email format.',
            errorAt: 'email',
            type: 'ValidationErr'
        };
        (0, consoleLogTerminal_1.returnErrorOnTerminal)(`${object.error.type}: ${object.error.message}`);
    }
    return object;
};
exports.validateEmailAt = validateEmailAt;
const validateEmailDot = (object, input) => {
    input.split('.').forEach((section) => {
        if (section.length === 0) {
            object.error = {
                message: 'The value provided does not fit the required email format.',
                errorAt: 'email',
                type: 'ValidationErr'
            };
            (0, consoleLogTerminal_1.returnErrorOnTerminal)(`${object.error.type}: ${object.error.message}`);
        }
    });
    return object;
};
exports.validateEmailDot = validateEmailDot;
const validateUniqueInput = (object, input) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield UserModel_1.UserModel.findOne({ email: input })) {
        object.error = {
            message: `'${input}' has already been used.`,
            errorAt: 'email',
            type: 'DuplicatationErr'
        };
        (0, consoleLogTerminal_1.returnErrorOnTerminal)(`${object.error.type}: ${object.error.message}`);
    }
    return object;
});
exports.validateUniqueInput = validateUniqueInput;
const validateEmailAddress = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // create an object that contains original value, trimmed
    const responseObject = {
        value: input.trim()
    };
    // run validation functions
    (0, exports.validateEmailAt)(responseObject, responseObject.value);
    (0, exports.validateEmailDot)(responseObject, responseObject.value);
    yield (0, exports.validateUniqueInput)(responseObject, responseObject.value);
    // if no errors, return original value inside of response object
    return responseObject;
});
exports.validateEmailAddress = validateEmailAddress;
