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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER = void 0;
const express_1 = __importDefault(require("express"));
const UserModel_1 = require("../../models/UserModel");
const basicResponses_1 = require("../basicResponses");
exports.ROUTER = express_1.default.Router();
const model = UserModel_1.UserModel;
exports.ROUTER.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model.find();
    res.status(200).json({ data });
}));
exports.ROUTER.get('/:id', (req, res) => {
    (0, basicResponses_1.actionById)({
        _id: req.params.id,
        model,
        action: 'find'
    })
        .then(r => {
        res.status(r.statusCode).json(r.response);
    })
        .catch(err => {
        res.status(500).json(err.message);
    });
});
exports.ROUTER.delete('/remove/:id', (req, res) => {
    (0, basicResponses_1.actionById)({
        _id: req.params.id, model, action: 'remove'
    })
        .then(r => {
        res.status(r.statusCode).json(r.response);
    })
        .catch(err => {
        res.status(500).json(err.message);
    });
});
