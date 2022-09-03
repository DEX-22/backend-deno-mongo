import {Router} from "https://deno.land/x/oak/mod.ts"
import { addTodo,getTodo,test } from "../controllers/todos.ts"
import { registerUser } from "../controllers/register.ts" 
import { validateLogin } from "../controllers/login.ts"

const router = new Router()


// ---------------------------- GET ----------------------------------
router.get('/',test)
router.get('/api/todos',getTodo)


// ---------------------------- POST ----------------------------------
router.post('/api/todos',addTodo)
router.post('/api/user/register',registerUser)
router.post('/api/login',validateLogin)

export default router

