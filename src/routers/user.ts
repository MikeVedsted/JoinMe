import express from 'express'

import { isAuthenticated } from '../middlewares/authentication'
import {
  findUserById,
  findAllUsers,
  updateUser,
  googleLogin,
  deleteUser,
  getUserCount
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUsers)
router.get('/count', getUserCount)
router.get('/:userId', findUserById)
router.post('/google-authenticate', googleLogin)
router.put('/:userId', isAuthenticated, updateUser)
router.delete('/:userId', isAuthenticated, deleteUser)

export default router
