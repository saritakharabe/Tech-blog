const router = require("express").Router();
const { Router } = require("express");
const { User, Comment, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (res, req) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "post_text"],
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    const post = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      post,
      logged_in: res.secure.logged_in,
    });
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/login", (res, req) => {
  if (req.session.logged_in) {
    return res.redirect("/");
  }
  res.render("login");
});

router.get("/signup", (res, req) => {
  res.render("signup");
});

module.exports = Router;
