import express from 'express'

import { isAuthenticated } from '../middlewares/authentication'
import { createComment, findCommentsByEventId } from '../controllers/comment'

const router = express.Router()

router.post('/:eventId', createComment)
router.get('/:eventId', findCommentsByEventId)

export default router
