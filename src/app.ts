import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import cors from 'cors'
import cookieparser from 'cookie-parser'

import { SESSION_SECRET } from './util/secrets'
import userRouter from './routers/user'
import eventRouter from './routers/event'
import commentRouter from './routers/comment'
import requestRouter from './routers/request'

const app = express()

app.set('port', process.env.PORT || 5000)
app.use(
  session({
    secret: process.env.SESSION_SECRET || SESSION_SECRET,
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use('/api/v1/users', userRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/requests', requestRouter)

export default app
