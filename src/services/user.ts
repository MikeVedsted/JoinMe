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