"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middlewares/authentication");
const comment_1 = require("../controllers/comment");
const router = express_1.default.Router();
router.post('/:eventId', authentication_1.isAuthenticated, comment_1.createComment);
router.get('/:eventId', authentication_1.isAuthenticated, comment_1.findCommentsByEventId);
router.put('/:commentId', authentication_1.isAuthenticated, authentication_1.isOwner, comment_1.updateComment);
router.delete('/:commentId', authentication_1.isAuthenticated, authentication_1.isOwner, comment_1.deleteComment);
exports.default = router;
//# sourceMappingURL=comment.js.map