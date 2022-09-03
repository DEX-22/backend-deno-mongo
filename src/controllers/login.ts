import { config } from "https://deno.land/x/dotenv/mod.ts"
import { Context } from "https://deno.land/x/oak/mod.ts"


const { FIRST_KEY,BASE_URI, DATABASE, DATA_SOURCE } = config()

const collection = "users"

const options = { 
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "api-key": FIRST_KEY
    },
    body: ""
}

const validateLogin = async ({request,response}:Context) => {
    try{
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success:false,
                msg: 'No data'
            }
        }else{
            const body = await request.body()
            const {user_name,password} = await body.value
            const URI = `${BASE_URI}/find`

            const query = {
                collection,
                database:DATABASE,
                dataSource:DATA_SOURCE,
                filter:{user_name,password}
            }

            options.body = JSON.stringify(query)

            const dataResponse = await fetch(URI,options)
            
            const {documents} = await dataResponse.json()

            if(documents.length > 0){
                const {_id,...data} = documents[0]
                response.status = 200
                response.body = {
                    success: true, 
                    data: {id:_id,...data},
                    msg: "OK"
                }
            }else{
                response.body = {
                    success:false,
                    data: [],
                    msg: "User o password incorrect"
                }    
            }

            

        }
    }catch(error){
        response.body = {
            success:false,
            msg: error.toString()
        }
    }
    
}


export {validateLogin}
