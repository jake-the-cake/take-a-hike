"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const stringValidation_1 = require("../packages/validata/stringValidation");
const validatePassword = (input) => {
    // create instance of StringValidation class
    const objectBeingValidated = new stringValidation_1.StringValidation(input, 'password');
    // run validation functions
    objectBeingValidated.stringLength(6, 100);
    objectBeingValidated.hasNoSpaces();
    objectBeingValidated.mustContain({
        packages: [
            'letter',
            'digit'
        ]
    });
    objectBeingValidated.hasValue();
    // log any errors
    if (objectBeingValidated.obj.error !== undefined)
        objectBeingValidated.errorLog();
    // return validation object
    return objectBeingValidated.obj;
};
exports.validatePassword = validatePassword;
