"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create and configure server
const APP = (0, express_1.default)();
dotenv_1.default.config();
// Constants
const { JWT_SECRET_KEY, PORT } = process.env;
const PORT_IN_USE = PORT || 5500;
// Variables
// Middleware
APP.use((0, cors_1.default)());
APP.use(express_1.default.json());
APP.use(express_1.default.urlencoded({ extended: true }));
// Routes
APP.get('/', (req, res) => {
    res.send('Live!');
});
APP.post('/request-token', (req, res) => {
    console.log(req.body);
    const { login, password } = req.body;
    const token = jsonwebtoken_1.default.sign({ data: `${login}:${password}` }, JWT_SECRET_KEY);
    res.json(token);
});
// Start server
APP.listen(PORT_IN_USE, () => {
    console.log(`Auth server running on port ${PORT_IN_USE}.`);
});
