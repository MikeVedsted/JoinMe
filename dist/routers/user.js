"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middlewares/authentication");
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get('/', user_1.findAllUsers);
router.get('/count', user_1.getUserCount);
router.get('/verify-token', authentication_1.isAuthenticated, user_1.getTokenInfo);
router.get('/:userId', authentication_1.isAuthenticated, authentication_1.isOwner, user_1.findUserById);
router.get('/:userId/public', authentication_1.isAuthenticated, user_1.findPublicUserInfo);
router.post('/google-authenticate', user_1.googleLogin);
router.put('/:userId', authentication_1.isAuthenticated, user_1.updateUser);
router.delete('/:userId', authentication_1.isAuthenticated, user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map