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
exports.removeParticipant = exports.rejectRequest = exports.acceptRequest = exports.findEventRequests = exports.cancelParticipation = exports.cancelRequest = void 0;
const apiError_1 = require("../helpers/apiError");
const request_1 = __importDefault(require("../services/request"));
const cancelRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { requestId } = req.params;
        const { user_id } = req.user;
        res.json(yield request_1.default.cancelRequest(requestId, user_id));
    }
    catch (error) {
        next(new apiError_1.BadRequestError('Request not found', error));
    }
});
exports.cancelRequest = cancelRequest;
const cancelParticipation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { participantId } = req.params;
        const { user_id } = req.user;
        res.json(yield request_1.default.cancelParticipation(participantId, user_id));
    }
    catch (error) {
        next(new apiError_1.BadRequestError('Please check your submission', error));
    }
});
exports.cancelParticipation = cancelParticipation;
const findEventRequests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { user_id } = req.user;
        const { eventId } = req.params;
        res.json(yield request_1.default.findEventRequests(eventId, user_id));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No requests found', error));
    }
});
exports.findEventRequests = findEventRequests;
const acceptRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { requestId } = req.params;
        const { user_id } = req.user;
        res.json(yield request_1.default.acceptRequest(requestId, user_id));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Request not found', error));
    }
});
exports.acceptRequest = acceptRequest;
const rejectRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { requestId } = req.params;
        const { user_id } = req.user;
        res.json(yield request_1.default.rejectRequest(requestId, user_id));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Request not found', error));
    }
});
exports.rejectRequest = rejectRequest;
const removeParticipant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { participantId } = req.params;
        const { user_id } = req.user;
        res.json(yield request_1.default.removeParticipant(participantId, user_id));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Request not found', error));
    }
});
exports.removeParticipant = removeParticipant;
//# sourceMappingURL=request.js.map