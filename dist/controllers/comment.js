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
exports.deleteComment = exports.updateComment = exports.findCommentsByEventId = exports.createComment = void 0;
const apiError_1 = require("../helpers/apiError");
const comment_1 = __importDefault(require("../services/comment"));
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw Error('Not authorized to do this');
    }
    try {
        const comment = {
            comment: req.body.comment,
            userk: req.user.user_id,
            event: req.params.eventId
        };
        res.json(yield comment_1.default.createComment(comment));
    }
    catch (error) {
        next(new apiError_1.BadRequestError('Failed to create comment', error));
    }
});
exports.createComment = createComment;
const findCommentsByEventId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        res.json(yield comment_1.default.findCommentsByEventId(eventId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('No comments found', error));
    }
});
exports.findCommentsByEventId = findCommentsByEventId;
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const update = req.body;
        return res.json(yield comment_1.default.updateComment(commentId, update));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Comment not found', error));
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        res.json(yield comment_1.default.deleteComment(commentId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Comment not found', error));
    }
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=comment.js.map