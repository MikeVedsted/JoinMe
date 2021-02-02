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
exports.findEventParticipants = exports.findParticipatingEvents = exports.findRequestedEvents = exports.requestToJoin = exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.findEventsByCreator = exports.findEventById = exports.findAllEvents = void 0;
const apiError_1 = require("../helpers/apiError");
const event_1 = __importDefault(require("../services/event"));
const findAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, lat, lng, distance } = req.query;
        res.json({
            events: yield event_1.default.findAllEvents(category, lat, lng, distance)
        });
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No events found', error));
    }
});
exports.findAllEvents = findAllEvents;
const findEventById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        res.json(yield event_1.default.findEventById(eventId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No event found', error));
    }
});
exports.findEventById = findEventById;
const findEventsByCreator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        res.json(yield event_1.default.findEventsByCreator(userId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No events found', error));
    }
});
exports.findEventsByCreator = findEventsByCreator;
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.user) {
            throw Error;
        }
        const { title, category, date, time, description, max_participants, image, expires_at, address } = req.body;
        const created_by = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
        const event = {
            title,
            category,
            date,
            time,
            description,
            max_participants,
            address,
            expires_at,
            created_by,
            image
        };
        res.json(yield event_1.default.createEvent(event));
    }
    catch (error) {
        next(new apiError_1.BadRequestError('Failed to create event', error));
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const update = req.body;
        return res.json(yield event_1.default.updateEvent(eventId, update));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Event not found', error));
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        res.json(yield event_1.default.deleteEvent(eventId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Event not found', error));
    }
});
exports.deleteEvent = deleteEvent;
const requestToJoin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { eventId } = req.params;
        const { user_id } = req.user;
        res.json(yield event_1.default.requestToJoin(eventId, user_id));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Event not found', error));
    }
});
exports.requestToJoin = requestToJoin;
const findRequestedEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { user_id } = req.user;
        return res.json(yield event_1.default.findRequestedEvents(user_id));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No results found', error));
    }
});
exports.findRequestedEvents = findRequestedEvents;
const findParticipatingEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { user_id } = req.user;
        return res.json(yield event_1.default.findParticipatingEvents(user_id));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No results found', error));
    }
});
exports.findParticipatingEvents = findParticipatingEvents;
const findEventParticipants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { eventId } = req.params;
        res.json(yield event_1.default.findEventParticipants(eventId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No participants found', error));
    }
});
exports.findEventParticipants = findEventParticipants;
//# sourceMappingURL=event.js.map