import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import {
  findUserById,
  updateUser,
  googleLogin,
  findParticipatingEvents,
  getUserCount,
  deleteUser
} from '../controllers/user'

const router = express.Router()

router.get('/:userId', isAuthenticated, findUserById)
// FIX create issue: Add one more route for limited user info (not owner)
router.get('/count', getUserCount)
router.get('/participant', isAuthenticated, findParticipatingEvents)
router.post('/google-authenticate', googleLogin)
router.put('/:userId', isAuthenticated, isOwner, updateUser)
router.delete('/:userId', isAuthenticated, isOwner, deleteUser)

export default router
