import express from 'express'

import { isAuthenticated } from '../middlewares/authentication'
import { createComment, findCommentsByEventId, updateComment } from '../controllers/comment'

const router = express.Router()

router.post('/:eventId', createComment)
router.get('/:eventId', findCommentsByEventId)
router.put('/:commentId', updateComment)

export default router
