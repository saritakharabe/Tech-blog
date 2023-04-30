const router = require("express").Router();
const { Router } = require("express");
const { User } = require("../../models");

router.get("/", async (res, req) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["[password]"],
      },
    });
    if (!userData) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router