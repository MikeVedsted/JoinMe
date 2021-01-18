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
router.get('/count', getUserCount) // USED
router.get('/:userId', isAuthenticated, isOwner, findUserById) // USED
router.get('/verify-token', isAuthenticated, getTokenInfo) // USED
router.get('/:userId/public', isAuthenticated, findPublicUserInfo) // USED
router.post('/google-authenticate', googleLogin) // USED
router.put('/:userId', isAuthenticated, updateUser)
router.delete('/:userId', isAuthenticated, deleteUser)

export default router
