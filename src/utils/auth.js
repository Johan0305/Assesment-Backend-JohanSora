const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Session expired");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Session expired !");
    }

    const { id } = jwt.verify(token, process.env.K3Y);

    req.user = id;

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
