import { Application } from "https://deno.land/x/oak/mod.ts"
import { oakCors } from "https://deno.land/x/cors/mod.ts"
import router from "../router/index.ts"


const port = 3000
const app = new Application()

app.use(oakCors())
app.use(router.routes())
app.use(router.allowedMethods())

console.log('it is running in port:'+port)
await app.listen({port})

// export default app