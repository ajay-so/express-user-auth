const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/user");

const { handleRegisterUser, searchUser, handleLoginUser } = require("../controllers/userControllers");

//register route
router.post("/register", handleRegisterUser);

//login route
router.post("/login", handleLoginUser);

//search
router.get("/search", authMiddleware, searchUser); 


module.exports = router;
