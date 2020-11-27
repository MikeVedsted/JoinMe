import passport from 'passport'
const GoogleTokenStrategy = require('passport-google-id-token')

 import { GOOGLE_CLIENT_ID } from '../util/secrets'

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user)
//   })
// })

// type NewUser = {
//   googleId: string,
//   firstName: string,
//   lastName: string,
//   email:string
// }

// passport.use(
//   new GoogleTokenStrategy(
//     {
//       clientID: GOOGLE_ID,
//     },
//     async (parsedToken: any, googleId: string, done: any) => {
//       const { payload } = parsedToken

//       let user = await User.findOne({ googleId: googleId })
//       if (user) {
//         done(null, user)
//       }
//       if (user === null) {
//         let newUser= {
//           googleId: googleId,
//           firstName: payload.given_name,
//           lastName: payload.family_name,
//           email: payload.email,
//           password: '',
//           admin: false,
//           banned: false,
//           transactions:[]
//         }
//         let createdUser = await User.create(newUser)
//         return done(null, createdUser)
//       }
//     }
//   )
// )
