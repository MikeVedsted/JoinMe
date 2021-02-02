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
exports.isOwner = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
const generateToken_1 = require("../helpers/generateToken");
const db_1 = __importDefault(require("../db"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies['x-auth-access-token'];
        const refreshToken = req.cookies['x-auth-refresh-token'];
        if (!accessToken || !refreshToken) {
            throw 'No Valid Token!';
        }
        else {
            jsonwebtoken_1.default.verify(accessToken, secrets_1.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    jsonwebtoken_1.default.verify(refreshToken, secrets_1.JWT_REFRESH_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                        if (err) {
                            res.json({ message: err.message });
                        }
                        else {
                            const newAccessToken = generateToken_1.generateAccessToken(decoded.sub);
                            res.cookie('x-auth-access-token', newAccessToken);
                            const DBResponse = yield db_1.default.query('SELECT * FROM userk WHERE user_id = $1', [
                                decoded.sub
                            ]);
                            const authenticatedUser = DBResponse.rows[0];
                            req.user = authenticatedUser;
                            next();
                        }
                    }));
                }
                else {
                    const DBResponse = yield db_1.default.query('SELECT * FROM userk WHERE user_id = $1', [decoded.sub]);
                    const authenticatedUser = DBResponse.rows[0];
                    req.user = authenticatedUser;
                    next();
                }
            }));
        }
    }
    catch (error) {
        res.json({ status: 'error', message: error });
    }
});
exports.isAuthenticated = isAuthenticated;
const isOwner = (req, res, next) => {
    try {
        console.log('check ownership');
        next();
    }
    catch (err) {
        res.status(400).json({ message: 'Not authorized' });
    }
};
exports.isOwner = isOwner;
//# sourceMappingURL=authentication.js.map