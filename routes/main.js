var express = require("express");
var router = express.Router();

const { checkAuth } = require("../model/auth");
const { getLeftMenusForUsers, getLeftMenusForManager } = require("../model/menu");
const { getAllPosts } = require("../model/post");

router.get("/", async function (req, res) {
  let id = req.user;
  let leftMenus = [];
  let authCode = '';
  let posts = [];
  if (typeof id !== "undefined") {
    authCode = await checkAuth(id);
    console.log("main auth_code : " + authCode);
    leftMenus = await getLeftMenusForManager();
    console.log(leftMenus);
    posts = await getAllPosts();
  } else {
    leftMenus = await getLeftMenusForUsers()
    posts = await getAllPosts();
  }

  // nodejs에서 포함된 것을 걸러내는 경우.. 데이터베이스에서 포함된 것만 가져오는 것이 더 좋을 듯.
  // let test_string = "AUTH0001, AUTH0002";
  // console.log('include test:' + test_string.includes("AUTH0001"));

  console.log("session_id in Main Page: " + req.sessionID);
  console.log("user id in passport: " + req.user);

  res.render("home", {
    userId: req.user,
    leftMenus: leftMenus,
    posts: posts,
  });
});

module.exports = router;
