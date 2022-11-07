const router = require("express").Router();
const UserModal = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModal.findOne({ email });
    if (!user)
      res.json({
        message:
          "user not found with this credentials! --> {username} Please signup!",
      });
    else {
      if (await bcrypt.compare(password, user.password))
        res.json({ message: "user exists!", data: user });
      else
        res.json({ message: "Please enter valid credentials --> {password} " });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/create-user", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModal.findOne({ email });
    if (user)
      res.status(200).json({ message: "user already exists please login!" });

    const hashedPasswd = await bcrypt.hash(password, 10);
    const created_user = await UserModal.create({
      username,
      email,
      password: hashedPasswd,
    });
    res.status(201).json({ message: "user created!", data: created_user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
