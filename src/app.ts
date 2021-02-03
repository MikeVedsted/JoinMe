import express from 'express'
import cors from 'cors'
import path from 'path'
import lusca from 'lusca'
import bodyParser from 'body-parser'
import compression from 'compression'
import session from 'express-session'
import cookieparser from 'cookie-parser'

import userRouter from './routers/user'
import eventRouter from './routers/event'
import commentRouter from './routers/comment'
import requestRouter from './routers/request'
import { SESSION_SECRET } from './util/secrets'

const app = express()

app.set('port', process.env.PORT || 5000)
app.use(
  session({
    secret: process.env.SESSION_SECRET || SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)

app.use(cors())

app.use(compression())
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieparser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/requests', requestRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/')))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/index.html'))
  })
}

export default app
