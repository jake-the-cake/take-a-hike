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
    constructor(obj, err) {
        this.obj = obj;
        this.errorAt = err || 'IDK';
    }
    errorLog() {
        (0, consoleLogTerminal_1.returnErrorOnTerminal)(`${this.obj.error.type}: ${this.obj.error.message}`);
    }
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
    hasValue() {
        if (this.obj.value.length === 0) {
            this.obj.error = {
                message: 'This field is required.',
                errorAt: this.errorAt,
                type: 'RequiredErr'
            };
        }
        return this.obj;
    }
}
exports.StringValidation = StringValidation;
