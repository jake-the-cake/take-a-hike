"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleLogEndpoints = void 0;
const consoleLogTerminal_1 = require("./consoleLogTerminal");
const consoleLogEndpoints = (object, endpoint, method) => {
    const PREFIX = `'${endpoint}' accessed via ${method.toUpperCase()}:\n\x1b[0m`;
    if (Object.keys(object).length === 0) {
        (0, consoleLogTerminal_1.returnInfoOnTerminal)(`${PREFIX}-- No data received.`);
    }
    else
        (0, consoleLogTerminal_1.returnInfoOnTerminal)(`${PREFIX}-- data: ${JSON.stringify(object)}`);
};
exports.consoleLogEndpoints = consoleLogEndpoints;
