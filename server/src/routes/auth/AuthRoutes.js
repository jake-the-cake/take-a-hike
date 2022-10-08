"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER = void 0;
const express_1 = __importDefault(require("express"));
// import { UserModel } from '../../models/UserModel'
exports.ROUTER = express_1.default.Router();
exports.ROUTER.get('/', (req, res) => {
    console.error(req);
    res.send('dont end up here');
});
exports.ROUTER.post('/login', (req, res) => {
    res.status(201).json({
        request: req.body
    });
});
exports.ROUTER.post('/register', (req, res) => {
    res.status(201).json({
        request: req.body
    });
});
