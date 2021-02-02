"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middlewares/authentication");
const event_1 = require("../controllers/event");
const router = express_1.default.Router();
router.post('/', authentication_1.isAuthenticated, event_1.createEvent);
router.post('/:eventId/request', authentication_1.isAuthenticated, event_1.requestToJoin);
router.get('/', event_1.findAllEvents);
router.get('/requested', authentication_1.isAuthenticated, event_1.findRequestedEvents);
router.get('/participant', authentication_1.isAuthenticated, event_1.findParticipatingEvents);
router.get('/creator/:userId', authentication_1.isAuthenticated, event_1.findEventsByCreator);
router.get('/:eventId', authentication_1.isAuthenticated, event_1.findEventById);
router.get('/:eventId/participants', authentication_1.isAuthenticated, event_1.findEventParticipants);
router.put('/:eventId', authentication_1.isAuthenticated, event_1.updateEvent);
router.delete('/:eventId', authentication_1.isAuthenticated, event_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=event.js.map