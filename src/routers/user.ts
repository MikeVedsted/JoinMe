import express from 'express'

import { isAuthenticated } from '../middlewares/authentication'
import {
  googleCreate,
  findUserById,
  findUserByEmail,
  findAllUsers,
  updateUser,
  googleLogin,
  deleteUser
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUsers)
router.get('/:userId', findUserById)
/* router.get('/:userEmail', findUserByEmail) */
router.post('/google-signup', googleCreate)
router.post('/google-authenticate', googleLogin)
router.put('/:userId', isAuthenticated, updateUser)
// FIX Add isAuthenticated and isOwner to delete route
router.delete('/:userId', deleteUser)

export default router
