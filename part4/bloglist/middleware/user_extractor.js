const jwt = require('jsonwebtoken')
const User = require("../models/user");

const extractUser = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(decodedToken)
  {
    const user = await User.findById(decodedToken.id)
    if(user){
        request.user = user
    }
  }
  next()
}

module.exports = extractUser