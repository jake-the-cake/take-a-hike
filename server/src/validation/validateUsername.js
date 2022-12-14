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
exports.validateUserName = void 0;
const UserModel_1 = require("../models/UserModel");
const stringValidation_1 = require("../packages/validata/stringValidation");
const validateUserName = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // create instance of StringValidation class
    const objectBeingValidated = new stringValidation_1.StringValidation(input, 'username');
    // run validation functions
    objectBeingValidated.stringLength(6, 15);
    objectBeingValidated.hasNoSpaces();
    objectBeingValidated.hasValue();
    objectBeingValidated.canContain({
        packages: [
            'all'
        ],
        chars: '-_.'
    });
    yield objectBeingValidated.isUnique(UserModel_1.UserModel);
    // log any errors
    if (objectBeingValidated.obj.error !== undefined)
        objectBeingValidated.errorLog();
    // return validation object
    return objectBeingValidated.obj;
});
exports.validateUserName = validateUserName;
