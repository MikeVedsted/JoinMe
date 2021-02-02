"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
//Generate access Token
const generateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({
        iss: 'JoinMe',
        sub: id
    }, secrets_1.JWT_SECRET, { expiresIn: 60 * 15 });
};
exports.generateAccessToken = generateAccessToken;
//Generate refresh token
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({
        iss: 'JoinMe',
        sub: id
    }, secrets_1.JWT_REFRESH_SECRET, { expiresIn: '30d' });
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generateToken.js.map