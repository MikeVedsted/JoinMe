"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./routers/user"));
const event_1 = __importDefault(require("./routers/event"));
const comment_1 = __importDefault(require("./routers/comment"));
const request_1 = __importDefault(require("./routers/request"));
const app = express_1.default();
app.set('port', process.env.PORT);
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET || secrets_1.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(cors_1.default({
    credentials: true,
    origin: ['http://localhost:3000']
}));
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
}
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/events', event_1.default);
app.use('/api/v1/comments', comment_1.default);
app.use('/api/v1/requests', request_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map