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
const db_1 = __importDefault(require("../db"));
const queries_1 = require("../db/queries");
const cancelRequest = (requestId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkRequestor = yield db_1.default.query(queries_1.requesterByRequestIdQ, [requestId]);
        if (checkRequestor.rows[0].requester !== userId) {
            throw Error('Not authorized to do that');
        }
        yield db_1.default.query(queries_1.deleteRequestQ, [requestId]);
        return { message: 'Request cancelled successfully' };
    }
    catch (error) {
        return error;
    }
});
const cancelParticipation = (participantId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkParticipant = yield db_1.default.query(queries_1.participantByParticipantIdQ, [participantId]);
        const { participant } = checkParticipant.rows[0];
        if (participant !== userId) {
            throw Error('Not authorized to do that');
        }
        yield db_1.default.query(queries_1.deleteParticipantQ, [participantId]);
        return { message: 'Participation cancelled successfully' };
    }
    catch (error) {
        return error;
    }
});
const findEventRequests = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findOwner = yield db_1.default.query(queries_1.findEventOwnerQ, [eventId]);
        const { created_by } = findOwner.rows[0];
        if (created_by !== userId) {
            throw Error('Not authorized for this');
        }
        const eventRequests = yield db_1.default.query(queries_1.findJoinRequestsByEventQ, [eventId]);
        const users = eventRequests.rows;
        return users;
    }
    catch (error) {
        return error;
    }
});
const acceptRequest = (requestId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findOwner = yield db_1.default.query(queries_1.findEventOwnerByRequestQ, [requestId]);
        const { created_by } = findOwner.rows[0];
        if (created_by !== userId) {
            throw new Error('Not authorized for this');
        }
        const createParticipant = yield db_1.default.query(queries_1.createParticipantQ, [requestId]);
        yield db_1.default.query(queries_1.deleteRequestQ, [requestId]);
        const participant = createParticipant.rows[0];
        return { message: 'Successfully accepted', participant };
    }
    catch (error) {
        return error;
    }
});
const rejectRequest = (requestId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findOwner = yield db_1.default.query(queries_1.findEventOwnerByRequestQ, [requestId]);
        const { created_by } = findOwner.rows[0];
        if (created_by !== userId) {
            throw new Error('Not authorized for this');
        }
        yield db_1.default.query(queries_1.deleteRequestQ, [requestId]);
        return { message: 'Successfully rejected' };
    }
    catch (error) {
        return error;
    }
});
const removeParticipant = (participantId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findOwner = yield db_1.default.query(queries_1.findEventOwnerByParticipantQ, [participantId]);
        const { created_by } = findOwner.rows[0];
        if (created_by !== userId) {
            throw Error('Not authorized to do that');
        }
        yield db_1.default.query(queries_1.deleteParticipantQ, [participantId]);
        return { message: 'Participation cancelled successfully' };
    }
    catch (error) {
        return error;
    }
});
exports.default = {
    acceptRequest,
    rejectRequest,
    cancelRequest,
    cancelParticipation,
    findEventRequests,
    removeParticipant
};
//# sourceMappingURL=request.js.map