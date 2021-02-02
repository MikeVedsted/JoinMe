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
const db_1 = __importDefault(require("../db"));
const queries_1 = require("../db/queries");
const createComment = (newComment) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, userk, event } = newComment;
    try {
        const DBResponse = yield db_1.default.query(queries_1.createCommentQ, [comment, userk, event]);
        const newComment = DBResponse.rows[0];
        return newComment;
    }
    catch (error) {
        return error;
    }
});
const findCommentsByEventId = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findEventCommentsQ, [eventId]);
        const comments = DBResponse.rows;
        return comments;
    }
    catch (error) {
        return error;
    }
});
const updateComment = (commentId, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findCommentByIdQ, [commentId]);
        const existingComment = DBResponse.rows[0];
        if (!existingComment) {
            throw { error: 'Comment not found' };
        }
        const { comment = existingComment.comment } = update;
        const updatedComments = yield db_1.default.query(queries_1.updateCommentQ, [commentId, comment]);
        const updatedComment = updatedComments.rows[0];
        return updatedComment;
    }
    catch (error) {
        return error;
    }
});
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DBResponse = yield db_1.default.query(queries_1.findCommentByIdQ, [commentId]);
        const commentToDelete = DBResponse.rows[0];
        if (!commentToDelete) {
            throw { error: 'Comment not found' };
        }
        yield db_1.default.query(queries_1.deleteCommentQ, [commentId]);
        return { message: 'Comment successfully deleted' };
    }
    catch (error) {
        return error;
    }
});
exports.default = {
    createComment,
    findCommentsByEventId,
    updateComment,
    deleteComment
};
//# sourceMappingURL=comment.js.map