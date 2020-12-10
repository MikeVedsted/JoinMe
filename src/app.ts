import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import cors from 'cors'
import cookieparser from 'cookie-parser'

import { SESSION_SECRET } from './util/secrets'
import eventRouter from './routers/event'
import userRouter from './routers/user'

const app = express()

app.set('port', process.env.PORT || 5000)
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000']
  })
)

app.use(compression())
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieparser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/events', eventRouter)

export default app
