const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("Token not found");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
