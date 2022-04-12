// Check username and password in post (login) request :
// if both exist -> create new JWT and send back to FE, since it needs to access it in order to send a new request (e.g. get).
// else -> provide error response.

// Setup authentication so only the request with JWT can access the dashboard, which is only accessible to authenticated users

// Only with a provided token, we can make a successful get request from the server.
// Remember that HTTP is stateless : this means that the server does not remember any previous requests sent by the same client. 
// This means that even after the nth dashboard request from the FE, we still to provide a valid token otherwise access will be denied.

// On the FE, whenever the user want to access a protected route the best practice is to send the JWT
//normally in the Authorization header using the Bearer schema :
// Authorization : Bearer <token>

// -----------*-----------*-----------*-----------*-----------*-----------*-----------*-----------
const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors'); // since we are exporting as an object

const login = async (req, res) => {
  // since it is a post route we know that the data will be in req.body
  const { username, password } = req.body;

  // First we should check if username and/or password have been provided, i.e. those fields are not empty
  // For this we can use either options : mongo, Joi (package), check in controller
  if (!username || !password) {
    // throw new CustomAPIError('Please provide email and password', 400); OLD
    throw new BadRequest('Please provide email and password'); //NEW
  };

  // Just as an example, usually it would provided by a DB
  const id = new Date().getDate();

  // It is a good idea to keep the payload small (the bigger, the more data we are sending) 
  // -> better user experinece, e.g. if internet connection is poor
  // In production USE long, complex and inguessable string values!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
  })
};

module.exports = {
  login, dashboard
};