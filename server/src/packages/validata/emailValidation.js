"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = void 0;
const stringValidation_1 = require("./stringValidation");
class EmailValidation extends stringValidation_1.StringValidation {
    constructor() {
        super(...arguments);
        // must have dot(s) -- can have more than one dot, but not in a row
        this.hasDots = () => {
            this.obj.value.split('.').forEach((section) => {
                if (section.length === 0) {
                    this.obj.error = {
                        message: 'Invalid email format.',
                        errorAt: this.errorAt,
                        type: 'SyntaxErr'
                    };
                }
            });
            return this.obj;
        };
        // must have exactly 1 @ symbol
        this.hasOneAt = () => {
            if (this.obj.value.split('@').length !== 2) {
                this.obj.error = {
                    message: 'Invalid email format.',
                    errorAt: this.errorAt,
                    type: 'SyntaxErr'
                };
            }
            return this.obj;
        };
        // must contain no other special characters
    }
}
exports.EmailValidation = EmailValidation;
