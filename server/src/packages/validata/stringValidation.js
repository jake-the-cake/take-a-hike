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
exports.StringValidation = void 0;
const consoleLogTerminal_1 = require("../../common/consoleLogTerminal");
class StringValidation {
    constructor(input, err) {
        this.obj = {
            value: input.trim()
        };
        this.errorAt = err || 'IDK';
    }
    errorLog() {
        (0, consoleLogTerminal_1.returnErrorOnTerminal)(`${this.obj.error.type}: ${this.obj.error.message} < @${this.errorAt} >`);
    }
    // check that a value is unique
    isUnique(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryObject = {};
            queryObject[this.errorAt] = this.obj.value;
            if (yield model.findOne(queryObject)) {
                this.obj.error = {
                    message: `'${this.obj.value}' has already been used.`,
                    errorAt: this.errorAt,
                    type: 'DuplicatationErr'
                };
            }
            return this.obj;
        });
    }
    // if value is required
    hasValue() {
        if (this.obj.value.length === 0) {
            this.obj.error = {
                message: `This field is required.`,
                errorAt: this.errorAt,
                type: 'RequiredErr'
            };
        }
        return this.obj;
    }
    // if it must contain no spaces
    hasNoSpaces() {
        const splitString = this.obj.value.split(' ');
        if (this.obj.value.split(' ').length > 1) {
            this.obj.error = {
                message: 'Cannot contain spaces.',
                errorAt: this.errorAt,
                type: 'SyntaxErr'
            };
        }
        return this.obj;
    }
    // set min and max string length
    stringLength(min, max = 50) {
        if (this.obj.value.length < min || (max && this.obj.value.length > max)) {
            this.obj.error = {
                message: `Must be between ${min} and ${max} characters.`,
                errorAt: this.errorAt,
                type: 'SyntaxErr'
            };
            return this.obj;
        }
    }
    // characters allowed
    canContain(args) {
        const { packages, chars } = args;
        let allowedCharacters = '';
        packages && packages.forEach((pack) => {
            switch (pack) {
                case 'upper':
                    allowedCharacters += 'A-Z';
                    break;
                case 'lower':
                    allowedCharacters += 'a-z';
                    break;
                case 'digit':
                    allowedCharacters += '0-9';
                    break;
                case 'all':
                    allowedCharacters += 'A-Za-z0-9';
                default:
                    break;
            }
        });
        if (chars)
            allowedCharacters += chars;
        const regExp = new RegExp(`^[${allowedCharacters}]*$`);
        if (!regExp.test(this.obj.value)) {
            this.obj.error = {
                message: `Invalid characters used.`,
                errorAt: this.errorAt,
                type: 'SyntaxErr'
            };
        }
        return this.obj;
    }
    // required characters
    mustContain(args) {
        const { packages, chars } = args;
        packages && packages.forEach((pack) => {
            let requiredCharacters = '';
            switch (pack) {
                case 'letter':
                    requiredCharacters += 'A-Za-z';
                    break;
                case 'digit':
                    requiredCharacters += '0-9';
                    break;
                default:
                    break;
            }
            const regExp = new RegExp(`^(.*[${requiredCharacters}].*)$`);
            if (this.obj.value.match(regExp) === null) {
                this.obj.error = {
                    message: `Criteria not met.`,
                    errorAt: this.errorAt,
                    type: 'SyntaxErr'
                };
            }
        });
        return this.obj;
    }
}
exports.StringValidation = StringValidation;
