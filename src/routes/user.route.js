import express from "express"
import { getUser, login, logout, register } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/get-user", getUser)


export default router