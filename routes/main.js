var express = require("express");
var router = express.Router();

const { checkAuth } = require("../model/auth");
const { getAllLeftMenus } = require("../model/menu");
const { getAllPosts } = require("../model/post");

router.get("/main", async function (req, res) {
  let id = req.user;
  if (typeof id !== "undefined") {
    var authCode = await checkAuth(id);
    console.log("main auth_code : " + authCode);
    var leftMenus = await getAllLeftMenus(authCode);
    console.log(leftMenus);
  }

  // nodejs에서 포함된 것을 걸러내는 경우.. 데이터베이스에서 포함된 것만 가져오는 것이 더 좋을 듯.
  // let test_string = "AUTH0001, AUTH0002";
  // console.log('include test:' + test_string.includes("AUTH0001"));

  console.log("session_id in Main Page: " + req.sessionID);
  console.log("user id in passport: " + req.user);

  res.render("home", {
    userId: req.user,
    leftMenus: leftMenus,
  });
});


router.get("/", async function (req, res) {
  let menus = await getAllMenus();
  let posts = await getAllPosts();

  res.render("home", {
    menus: menus,
    posts: posts,
  });
});

module.exports = router;
