import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import { acceptRequest, rejectRequest } from '../controllers/request'

const router = express.Router()

router.post('/:requestId/accept', acceptRequest)
router.delete('/:requestId/reject', rejectRequest)

export default router
