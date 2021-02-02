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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries_1 = require("../db/queries");
const db_1 = __importDefault(require("../db"));
const generateToken_1 = require("../helpers/generateToken");
const googleLogin = (id_token, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jsonwebtoken_1.default.decode(id_token);
    const { given_name, family_name, picture, email } = decodedToken;
    try {
        const DBResponse = yield db_1.default.query(queries_1.findUserByEmailQ, [email]);
        const user = DBResponse.rows[0];
        if (!user) {
            const createUser = yield db_1.default.query(queries_1.createUserQ, [picture, given_name, family_name, email]);
            const DBResponse = yield db_1.default.query(queries_1.findUserByIdQ, [createUser.rows[0].user_id]);
            const newUser = DBResponse.rows[0];
            const accessToken = generateToken_1.generateAccessToken(newUser.user_id);
            const refreshToken = generateToken_1.generateRefreshToken(newUser.user_id);
            res.cookie('x-auth-access-token', accessToken);
            res.cookie('x-auth-refresh-token', refreshToken);
            return newUser;
        }
        else {
            const accessToken = generateToken_1.generateAccessToken(user.user_id);
            const refreshToken = generateToken_1.generateRefreshToken(user.user_id);
            res.cookie('x-auth-access-token', accessToken);
            res.cookie('x-auth-refresh-token', refreshToken);
            return user;
        }
    }
    catch (error) {
        return error;
    }
});
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findUserByIdQ, [userId]);
        if (DBResponse.rows.length === 0) {
            throw { status: 404, message: 'No found user' };
        }
        else {
            const user = DBResponse.rows[0];
            return user;
        }
    }
    catch (error) {
        if (error.status) {
            return error;
        }
        else {
            return { status: 500, message: 'Bad Request', error: error };
        }
    }
});
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findAllUsersQ);
        const users = DBResponse.rows;
        return users;
    }
    catch (error) {
        return error;
    }
});
const updateUser = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userResponse = yield db_1.default.query(queries_1.rawUserkByIdQ, [userId]);
        const user = userResponse.rows[0];
        if (!user) {
            throw new Error('User not found');
        }
        const { first_name = user.first_name, last_name = user.last_name, profile_image = user.profile_image, profile_text = user.profile_text, date_of_birth = user.date_of_birth, gender = user.gender } = update;
        const { base_address } = user;
        let addressId = base_address;
        if (update.address) {
            const address = update.address;
            const { street, number, postal_code, city, country, lat, lng } = address;
            const addressResponse = yield db_1.default.query(queries_1.addressIdByLocQ, [lat, lng]);
            if (addressResponse.rowCount === 0) {
                const newAddress = yield db_1.default.query(queries_1.createAddressQ, [
                    street,
                    number,
                    postal_code,
                    city,
                    country,
                    lat,
                    lng
                ]);
                addressId = newAddress.rows[0].address_id;
            }
            else {
                addressId = addressResponse.rows[0].address_id;
            }
        }
        const updateUser = yield db_1.default.query(queries_1.updateUserQ, [
            userId,
            first_name,
            last_name,
            profile_image,
            profile_text,
            addressId,
            date_of_birth,
            gender
        ]);
        const DBResponse = yield db_1.default.query(queries_1.findUserByIdQ, [updateUser.rows[0].user_id]);
        const updatedUser = DBResponse.rows[0];
        return updatedUser;
    }
    catch (error) {
        return error;
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const DBResponse = yield db_1.default.query(queries_1.rawUserkByIdQ, [userId]);
    const user = DBResponse.rows[0];
    if (!user) {
        throw new Error();
    }
    yield db_1.default.query(queries_1.deleteUserQ, [userId]);
    return { message: 'User deleted' };
});
const getUserCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findAllUsersQ);
        const count = DBResponse.rows.length;
        return count;
    }
    catch (error) {
        return error;
    }
});
const getInterestedEvents = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findEventRequestsByUserQ, [user_id]);
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
const findPublicUserInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const DBResponse = yield db_1.default.query(queries_1.findPublicUserQ, [userId]);
    if (DBResponse.rows.length > 0) {
        const publicInfo = DBResponse.rows[0];
        return publicInfo;
    }
    else {
        throw 'No found user';
    }
});
exports.default = {
    findUserById,
    findAllUsers,
    updateUser,
    googleLogin,
    deleteUser,
    getUserCount,
    getInterestedEvents,
    findParticipatingEvents,
    findPublicUserInfo
};
//# sourceMappingURL=user.js.map