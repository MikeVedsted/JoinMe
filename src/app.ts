import express from "express"
import compression from "compression" // compresses requests
import session from "express-session"
import bodyParser from "body-parser"
import lusca from "lusca"
import { Client } from "pg"

import {
  SESSION_SECRET,
  PG_USER,
  PG_HOST,
  PG_DB,
  PG_PW,
  PG_PORT,
  PG_URI
} from "./util/secrets"
/**
 * Controllers (route handlers)
 */
import eventRouter from "./routers/event"
import userRouter from "./routers/user"

/**
 * Configure db connection and connect
 */ 
const client = new Client({
  connectionString: PG_URI,
  ssl: {
    rejectUnauthorized: false
  }
})
client.connect()

/**
 * Create Express server
 */
const app = express()

/**
 * Express configuration
 */
app.set("port", process.env.PORT || 5000)
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

/**
 * 3rd part configuration
 */
app.use(compression())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe("SAMEORIGIN"))
app.use(lusca.xssProtection(true))


// Use routers
app.use("/api/v1/users", userRouter)
app.use("/api/v1/events", eventRouter)
app.use("/api/v1/users/google-authenticate", (req:any, res:any) => {
  console.log("xxx", req.body)
})


export default app
