"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrailModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Trail = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    marker: {
        color: String,
        symbol: String
    },
    trailType: {
        type: String
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.TrailModel = mongoose_1.default.model('TrailModel', Trail);
