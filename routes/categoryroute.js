const express = require("express")
const router = express.Router()
const { addCategory ,findCategories} = require("../controllers/categorycontroller")
const {authenticateToken} = require("../jwt/jwt_operations")
const {adminMiddleware,authpermission} = require("../middleware")
router.post("/category/create",addCategory)
router.get("/category/getCategories",findCategories)
module.exports = router