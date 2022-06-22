const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        email,
        password: encPassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.K3Y, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ message: "User could not be registered" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("User or password not valid !");
      }
      const token = jwt.sign({ id: user._id }, process.env.K3Y, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error: ${err}` });
    }
  },
};
