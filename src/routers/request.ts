import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import { acceptRequest } from '../controllers/request'

const router = express.Router()

router.post('/:requestId/accept', acceptRequest)

export default router
