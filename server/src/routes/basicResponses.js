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
exports.actionById = void 0;
const actionById = ({ _id, model, action }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {};
    let data = {};
    let statusCode = 500;
    let actionWord = '[ message prefix ]';
    try {
        switch (action) {
            case 'remove':
                yield model.findByIdAndDelete(_id);
                actionWord = 'removed';
                break;
            case 'update':
                yield model.findByIdAndUpdate(_id);
                actionWord = 'updated';
                break;
            case 'find':
                response.data = yield model.findById(_id);
                actionWord = 'found';
                statusCode = 200;
                break;
            default:
                break;
        }
        response.status = 'SUCCESS';
        response.message = `Provided ID (${_id}) has been ${actionWord}.`;
        statusCode !== 200 ? statusCode = 201 : statusCode;
    }
    catch (err) {
        console.log(err.message);
        response.status = 'ERROR',
            response.message = `Provided ID (${_id}) cannot be found.`;
        statusCode = 401;
    }
    return {
        response,
        statusCode
    };
});
exports.actionById = actionById;
