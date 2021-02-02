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
const queries_1 = require("../db/queries");
const db_1 = __importDefault(require("../db"));
const createEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, date, time, description, max_participants, expires_at, created_by, image } = event;
        let { address } = event;
        const { lat, lng } = address;
        const existingAddresses = yield db_1.default.query(queries_1.addressIdByLocQ, [lat, lng]);
        if (existingAddresses.rowCount !== 0) {
            address = existingAddresses.rows[0].address_id;
        }
        else {
            const { street, number, postal_code, city, country } = address;
            const newAddress = yield db_1.default.query(queries_1.createAddressQ, [
                street,
                number,
                postal_code,
                city,
                country,
                lat,
                lng
            ]);
            address = newAddress.rows[0].address_id;
        }
        const createEvent = yield db_1.default.query(queries_1.createEventQ, [
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
        ]);
        const newEvent = createEvent.rows[0];
        return newEvent;
    }
    catch (error) {
        return error;
    }
});
const findAllEvents = (category, lat, lng, distance) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryCondition = '';
        let locationQuery = '';
        let distanceJoinQuery = '';
        if (category) {
            categoryCondition = `WHERE category = (SELECT category_id FROM category WHERE name = '${category}')`;
        }
        if (lat && lng && distance) {
            const latQuery = parseFloat(lat);
            const lngQuery = parseFloat(lng);
            const distanceQuery = parseInt(distance);
            locationQuery = `
      WITH tmp as
      (SELECT * FROM
      (SELECT
          *, (
            3959 * acos (
            cos ( radians(${latQuery}) )
            * cos( radians( lat ) )
            * cos( radians( lng ) - radians(${lngQuery}) )
            + sin ( radians(${latQuery}) )
            * sin( radians( lat ) )
          )
      ) AS distance
      FROM address) al
      WHERE distance < ${distanceQuery} * 0.621371
      ORDER BY distance)
      `;
            distanceJoinQuery = `INNER JOIN tmp ON tmp.address_id = event.address`;
        }
        const query = `
      ${locationQuery}
      SELECT 
        event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
        address.street, address.number, address.postal_code, address.city, address.lat, address.lng,
	      name as category, 
        first_name, last_name,
        count(ep_id) as participants        
      FROM event
      ${distanceJoinQuery}
      LEFT JOIN address on event.address = address.address_id
      LEFT JOIN category on event.category = category.category_id
      LEFT JOIN userk on event.created_by = userk.user_id
      LEFT JOIN event_participant on event.event_id = event_participant.event
      ${categoryCondition}
      group by event_id, address.street, address.number, address.postal_code, address.city, address.lat, address.lng, name, first_name, last_name
    `;
        const DBResponse = yield db_1.default.query(query);
        const allEvents = DBResponse.rows;
        return allEvents;
    }
    catch (error) {
        return error;
    }
});
const findEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findEventByIdQ, [eventId]);
        const event = DBResponse.rows[0];
        return event;
    }
    catch (error) {
        return error;
    }
});
const findEventsByCreator = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findEventsByCreatorQ, [userId]);
        const events = DBResponse.rows;
        return events;
    }
    catch (error) {
        return error;
    }
});
const updateEvent = (eventId, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findEvent = yield db_1.default.query(queries_1.findRawEventByIdQ, [eventId]);
        const event = findEvent.rows[0];
        if (!event) {
            throw { error: 'Event not found' };
        }
        let { address } = event;
        const { category = event.category, title = event.title, time = event.time, date = event.date, expires_at = event.expires_at, max_participants = event.max_participants, description = event.description, image = event.image } = update;
        if (!update.address) {
            address = findEvent.rows[0].address;
        }
        else {
            const { street, number, postal_code, city, country, lat, lng } = update.address;
            const findExistingAddress = yield db_1.default.query(queries_1.addressIdByLocQ, [lat, lng]);
            if (findExistingAddress.rowCount === 0) {
                const newAddress = yield db_1.default.query(queries_1.createAddressQ, [
                    street,
                    number,
                    postal_code,
                    city,
                    country,
                    lat,
                    lng
                ]);
                address = newAddress.rows[0].address_id;
            }
        }
        const updateEvent = yield db_1.default.query(queries_1.updateEventQ, [
            eventId,
            title,
            date,
            time,
            description,
            max_participants,
            expires_at,
            image,
            category,
            address
        ]);
        const updatedEvent = updateEvent.rows[0];
        return updatedEvent;
    }
    catch (error) {
        return error;
    }
});
const deleteEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const DBResponse = yield db_1.default.query(queries_1.findEventByIdQ, [eventId]);
    const eventToDelete = DBResponse.rows[0];
    if (!eventToDelete) {
        return { error: 'Event not found' };
    }
    db_1.default.query(queries_1.deleteEventQ, [eventId]);
    return { message: 'Event Successfully deleted!' };
});
const requestToJoin = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfRequested = yield db_1.default.query(queries_1.checkRequestStatusQ, [eventId, userId]);
    if (checkIfRequested.rows.length > 0) {
        return { message: 'Already requested' };
    }
    const newRequest = yield db_1.default.query(queries_1.createNewRequestQ, [eventId, userId]);
    const request = newRequest.rows[0];
    return { message: 'Successfully requested', request };
});
const findRequestedEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findEventRequestsByUserQ, [userId]);
        const events = DBResponse.rows;
        return events;
    }
    catch (error) {
        return error;
    }
});
const findParticipatingEvents = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findEventParticipatingQ, [user_id]);
        const events = DBResponse.rows;
        return events;
    }
    catch (error) {
        return error;
    }
});
const findEventParticipants = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findParticipantsByEventQ, [eventId]);
        const events = DBResponse.rows;
        return events;
    }
    catch (error) {
        return error;
    }
});
exports.default = {
    createEvent,
    findEventById,
    findEventsByCreator,
    findAllEvents,
    updateEvent,
    deleteEvent,
    requestToJoin,
    findRequestedEvents,
    findParticipatingEvents,
    findEventParticipants
};
//# sourceMappingURL=event.js.map