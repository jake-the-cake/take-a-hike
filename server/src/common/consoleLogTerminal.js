"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnErrorOnTerminal = void 0;
const returnErrorOnTerminal = (input) => {
    return console.log(`\x1b[35m\x1b[46m -- ${input} -- \x1b[0m`);
};
exports.returnErrorOnTerminal = returnErrorOnTerminal;
