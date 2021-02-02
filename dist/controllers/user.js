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
exports.findPublicUserInfo = exports.getUserCount = exports.deleteUser = exports.updateUser = exports.findUserById = exports.findAllUsers = exports.getTokenInfo = exports.googleLogin = void 0;
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
const googleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_token } = req.body;
        return res.json(yield user_1.default.googleLogin(id_token, res));
    }
    catch (error) {
        next(new apiError_1.BadRequestError('Unexpected error', error));
    }
});
exports.googleLogin = googleLogin;
const getTokenInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw Error;
        }
        const { user_id } = req.user;
        return res.json(yield user_1.default.findUserById(user_id));
    }
    catch (error) {
        next(new apiError_1.BadRequestError('Unexpected error', error));
    }
});
exports.getTokenInfo = getTokenInfo;
const findAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(yield user_1.default.findAllUsers());
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No users found', error));
    }
});
exports.findAllUsers = findAllUsers;
const findUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        return res.json(yield user_1.default.findUserById(userId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('User not found', error));
    }
});
exports.findUserById = findUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const update = req.body;
        return res.json(yield user_1.default.updateUser(userId, update));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('User not found', error));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        return res.json(yield user_1.default.deleteUser(userId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('User not found', error));
    }
});
exports.deleteUser = deleteUser;
const getUserCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(yield user_1.default.getUserCount());
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No users found', error));
    }
});
exports.getUserCount = getUserCount;
const findPublicUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        return res.json(yield user_1.default.findPublicUserInfo(userId));
    }
    catch (error) {
        res.json({ status: 'error', message: 'No found user' });
    }
});
exports.findPublicUserInfo = findPublicUserInfo;
//# sourceMappingURL=user.js.map