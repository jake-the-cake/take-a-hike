"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailAddress = exports.ValidateEmailDot = exports.validateEmailAt = void 0;
const consoleLogTerminal_1 = require("../common/consoleLogTerminal");
const validateEmailAt = (object, input) => {
    if (input.split('@').length !== 2) {
        object.error = {
            message: 'The value provided does not fit the required email format.',
            type: 'ValidationErr'
        };
        (0, consoleLogTerminal_1.returnErrorOnTerminal)(`${object.error.type}: ${object.error.message}`);
    }
    return object;
};
exports.validateEmailAt = validateEmailAt;
const ValidateEmailDot = (object, input) => {
    input.split('.').forEach((section) => {
        if (section.length === 0) {
            object.error = {
                message: 'The value provided does not fit the required email format.',
                type: 'ValidationErr'
            };
        }
    });
    return object;
};
exports.ValidateEmailDot = ValidateEmailDot;
const validateEmailAddress = (input) => {
    // create an object that contains original value, trimmed
    const responseObject = {
        value: input.trim()
    };
    // run validation functions
    (0, exports.validateEmailAt)(responseObject, responseObject.value);
    (0, exports.ValidateEmailDot)(responseObject, responseObject.value);
    // if no errors, return original value inside of response object
    return responseObject;
};
exports.validateEmailAddress = validateEmailAddress;
