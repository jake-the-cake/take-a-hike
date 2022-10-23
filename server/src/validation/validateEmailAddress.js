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
exports.validateEmailAddress = void 0;
const UserModel_1 = require("../models/UserModel");
const emailValidation_1 = require("../packages/validata/emailValidation");
const validateEmailAddress = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // create instance of EmailValidation class
    const objectBeingValidated = new emailValidation_1.EmailValidation(input, 'email');
    // run validation functions
    objectBeingValidated.hasDots();
    objectBeingValidated.hasOneAt();
    objectBeingValidated.hasNoSpaces();
    objectBeingValidated.hasValue();
    yield objectBeingValidated.isUnique(UserModel_1.UserModel);
    // log any errors
    if (objectBeingValidated.obj.error !== undefined)
        objectBeingValidated.errorLog();
    // return validation object
    return objectBeingValidated.obj;
});
exports.validateEmailAddress = validateEmailAddress;
