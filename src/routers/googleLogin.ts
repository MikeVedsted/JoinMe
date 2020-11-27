import express from "express"

import {googleLogin } from "../controllers/googleLogin"

const router = express.Router()

router.post("/google/authenticate", googleLogin)

export default router