"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middlewares/authentication");
const request_1 = require("../controllers/request");
const router = express_1.default.Router();
router.post('/:requestId/accept', authentication_1.isAuthenticated, request_1.acceptRequest);
router.delete('/:requestId/reject', authentication_1.isAuthenticated, request_1.rejectRequest);
router.delete('/:requestId/cancel', authentication_1.isAuthenticated, request_1.cancelRequest);
router.delete('/:participantId/remove-participant', authentication_1.isAuthenticated, request_1.removeParticipant);
router.delete('/:participantId/leave', authentication_1.isAuthenticated, request_1.cancelParticipation);
router.get('/:eventId', authentication_1.isAuthenticated, request_1.findEventRequests);
exports.default = router;
//# sourceMappingURL=request.js.map