var express = require("express");
var router = express.Router();

const { auth_check } = require("../model/auth_check");
const { getAllMenus } = require("../model/menu");

router.get("/main", async function (req, res) {
  let mnger_id = req.user;
  if (typeof mnger_id !== "undefined") {
    var auth_cd = await auth_check(mnger_id);
    console.log("main auth_cd : " + auth_cd);
    var left_menus = await get_left_menus(auth_cd);
    console.log(left_menus);
  }

  // nodejs에서 포함된 것을 걸러내는 경우.. 데이터베이스에서 포함된 것만 가져오는 것이 더 좋을 듯.
  // let test_string = "AUTH0001, AUTH0002";
  // console.log('include test:' + test_string.includes("AUTH0001"));

  console.log("session_id in Main Page: " + req.sessionID);
  console.log("user id in passport: " + req.user);

  res.render("main", {
    session_id: req.user,
    left_menus: left_menus,
  });
});

router.get("/", async function (req, res) {
  let menus = await getAllMenus();

  res.render("home", {
    menus: menus,
  });
});

module.exports = router;
