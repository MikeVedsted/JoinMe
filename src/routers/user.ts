import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import {
  findUserById,
  findAllUsers,
  updateUser,
  googleLogin,
  deleteUser,
  getTokenInfo,
  getUserCount,
  findPublicUserInfo
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUsers)
router.get('/count', getUserCount)
router.get('/verify-token', isAuthenticated, getTokenInfo)
router.get('/:userId', isAuthenticated, isOwner, findUserById)
router.get('/:userId/public', isAuthenticated, findPublicUserInfo)
router.post('/google-authenticate', googleLogin)
router.put('/:userId', isAuthenticated, updateUser)
router.delete('/:userId', isAuthenticated, deleteUser)

export default router
