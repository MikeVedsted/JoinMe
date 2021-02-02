"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PG_URI = exports.PG_PORT = exports.PG_PW = exports.PG_DB = exports.PG_HOST = exports.PG_USER = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.JWT_REFRESH_SECRET = exports.JWT_SECRET = exports.SESSION_SECRET = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    logger_1.default.debug('Using .env.example file to supply config environment variables');
    dotenv_1.default.config({ path: '.env.example' }); // you can delete this after you create your own .env file
}
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === 'production';
exports.SESSION_SECRET = process.env['SESSION_SECRET'];
exports.JWT_SECRET = process.env['JWT_SECRET'];
exports.JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'];
exports.GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
exports.GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'];
exports.PG_USER = process.env['PG_USER'];
exports.PG_HOST = process.env['PG_HOST'];
exports.PG_DB = process.env['PG_DB'];
exports.PG_PW = process.env['PG_PW'];
exports.PG_PORT = process.env['PG_PORT'];
exports.PG_URI = process.env['PG_URI'];
if (!exports.SESSION_SECRET ||
    !exports.JWT_SECRET ||
    !exports.JWT_REFRESH_SECRET ||
    !exports.GOOGLE_CLIENT_ID ||
    !exports.GOOGLE_CLIENT_SECRET ||
    !exports.PG_USER ||
    !exports.PG_HOST ||
    !exports.PG_DB ||
    !exports.PG_PW ||
    !exports.PG_PORT ||
    !exports.PG_URI) {
    logger_1.default.error('Some environment variable is missing. Make sure to provide all of the following: SESSION_SECRET, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT, PG_URI');
    process.exit(1);
}
if (!exports.PG_URI) {
    if (prod) {
        logger_1.default.error('No PG connection string. Set PG_URI environment variable.');
    }
    else {
        logger_1.default.error('No PG connection string. Set PG_URI_LOCAL environment variable.');
    }
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map