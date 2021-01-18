import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import {
  createComment,
  findCommentsByEventId,
  updateComment,
  deleteComment
} from '../controllers/comment'

const router = express.Router()

router.post('/:eventId', isAuthenticated, createComment)
router.get('/:eventId', isAuthenticated, findCommentsByEventId)
router.put('/:commentId', isAuthenticated, isOwner, updateComment)
router.delete('/:commentId', isAuthenticated, isOwner, deleteComment)

export default router
