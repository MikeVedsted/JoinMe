import express from 'express'

import { isAuthenticated } from '../middlewares/authentication'
import {
  createComment,
  findCommentsByEventId,
  updateComment,
  deleteComment
} from '../controllers/comment'

const router = express.Router()

router.post('/:eventId', createComment)
router.get('/:eventId', findCommentsByEventId)
router.put('/:commentId', updateComment)
router.delete('/:commentId', deleteComment)

export default router
