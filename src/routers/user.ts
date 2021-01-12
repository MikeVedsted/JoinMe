import express from 'express'

import { isAuthenticated, verifyRefreshToken } from '../middlewares/authentication'
import {
  findUserById,
  findAllUsers,
  updateUser,
  googleLogin,
  deleteUser,
  getInterestedEvents,
  findParticipatingEvents,
  refreshToken,
  getTokenInfo,
  getUserCount
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUsers)
router.get('/count', getUserCount)
router.get('/verify-token', isAuthenticated, getTokenInfo)
router.get('/refresh-token', verifyRefreshToken, refreshToken)
router.get('/interested', isAuthenticated, getInterestedEvents)
router.get('/participant', isAuthenticated, findParticipatingEvents)
router.get('/:userId', isAuthenticated, findUserById)
router.post('/google-authenticate', googleLogin)
router.put('/:userId', isAuthenticated, updateUser)
router.delete('/:userId', isAuthenticated, deleteUser)

export default router
