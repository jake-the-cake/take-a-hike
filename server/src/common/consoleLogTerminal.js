"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnInfoOnTerminal = exports.returnErrorOnTerminal = void 0;
const prefix = () => {
    const timestamp = new Date(Date.now());
    return `\x1b[31mServer Log || \x1b[37m${timestamp.toDateString()} @ ${timestamp.toLocaleTimeString()}\n**`;
};
const returnErrorOnTerminal = (input) => {
    return console.log(`${prefix()} \x1b[35m\x1b[40m ${input} \x1b[0m`);
};
exports.returnErrorOnTerminal = returnErrorOnTerminal;
const returnInfoOnTerminal = (input) => {
    return console.log(`${prefix()}\x1b[33m ${input} \x1b[0m`);
};
exports.returnInfoOnTerminal = returnInfoOnTerminal;
