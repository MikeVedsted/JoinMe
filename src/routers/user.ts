import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import { findUserById, updateUser, googleLogin, deleteUser } from '../controllers/user'

const router = express.Router()

router.get('/:userId', isAuthenticated, isOwner, findUserById)
// FIX create issue: Add one more route for limited user info (not owner)
router.post('/google-authenticate', googleLogin)
router.put('/:userId', isAuthenticated, isOwner, updateUser)
router.delete('/:userId', isAuthenticated, isOwner, deleteUser)

export default router
