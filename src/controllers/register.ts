import { config } from "https://deno.land/x/dotenv/mod.ts"
import { Context } from "https://deno.land/x/oak/mod.ts";

const { APP_ID,FIRST_KEY } = config()

const collection = "users"
const database = "todo_db"
const dataSource = "ClusterPractice"
const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`

const options = { 
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "api-key": FIRST_KEY
    },
    body: ""
}

const registerUser = async ({request,response}:Context) => {

        try{
            if(!request.hasBody){
                response.status = 400
                response.body = {
                    success:false,
                    msg: 'No data'
                }
            }else{
                const body = await request.body()
                const user = await body.value
                const URI = `${BASE_URI}/insertOne`
                const query = {
                    collection,
                    database,
                    dataSource,
                    document: user
                }

                options.body = JSON.stringify(query)

                const dataResponse = await fetch(URI,options)
                const { insertedId } = await dataResponse.json()

                response.status = 201
                response.body = {
                    success: true,
                    data: user,
                    insertedId
                }

            }
        }catch(error){
            response.body = {
                success:false,
                msg: error.toString()
            }
        }
        

}





export { registerUser }

