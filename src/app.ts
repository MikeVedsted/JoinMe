import express from "express"
import compression from "compression" // compresses requests
import session from "express-session"
import bodyParser from "body-parser"
import lusca from "lusca"
import passport from 'passport'
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
import googleLoginRouter from "./routers/googleLogin"


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
 * Check that connection is established (can be removed once succesful)
 * */ 
client.query("SELECT table_schema,table_name FROM information_schema.tables;", (err, res) => {
  if (err) throw err
  for (const row of res.rows) {
    console.log(JSON.stringify(row))
  }
  client.end()
})

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

// passport initialization and session
app.use(passport.initialize())
app.use(passport.session())

// Use routers
app.use("/users", userRouter)
app.use("/events", eventRouter)
app.use("/login", googleLoginRouter)

export default app
