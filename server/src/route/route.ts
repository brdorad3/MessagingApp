import { Router } from "express"
import { test } from "../controllers/test"
import { register } from "../controllers/user"
import { register_get } from "../controllers/user"
import { about_post } from "../controllers/user"
import { add_contact } from "../controllers/user"
import { fetch_user_data } from "../controllers/user"
import { update_contacts } from "../controllers/user"

const router = Router()

router.get("/", test)
//router.post("/register", register);
router.get("/register",  register_get)
router.post("/:id/about", about_post)
router.post("/contacts", add_contact)
router.get("/:id/fetch", fetch_user_data)
router.post("/:id/update", update_contacts)


export default router