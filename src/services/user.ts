import { Pool } from "pg"

import { PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT } from "../util/secrets"

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PW,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

function googleCreate(user: any) {
  console.log("googleCreate fired")
}

async function findUserById(userId: string) {
  console.log("findUserByID fired for id: ", userId)
}

function findAllUsers() {
  console.log("findAllUsers fired")
}

async function updateUser(
  userId: string,
  update: string
){
  console.log("Update user fired for userid: ", userId, "update(should be changed from string): ", update)
}

function deleteUser(userId: string) {
  // FIX CHECK if user id exist
  pool.query("DELETE FROM users WHERE id = $1;", [userId], (err, res) => {
      if (err) throw err
      for (const row of res.rows) {
        console.log(JSON.stringify(row))
      }
      pool.end()
    })
 
  console.log("Delete user fired for id: ", userId)
}

function googleLogin() {
  console.log("googleLogin fired")
}

async function findUserByEmail(userEmail: string) {
  console.log("Find user fired for email: ", userEmail)
}

export default {
  googleCreate,
  findUserById,
  findUserByEmail,
  findAllUsers,
  updateUser,
  googleLogin,  
  deleteUser,
}