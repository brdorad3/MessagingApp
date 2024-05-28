import { Router } from "express"
import { test } from "../controllers/test"
import { register } from "../controllers/user"
import { register_get } from "../controllers/user"
import { about_post } from "../controllers/user"

const router = Router()

router.get("/", test)
//router.post("/register", register);
router.get("/register",  register_get)
router.post("/:id/about", about_post)


export default router