import { config } from "https://deno.land/x/dotenv/mod.ts"
import { Context } from "https://deno.land/x/oak/mod.ts";

const { FIRST_KEY,BASE_URI, DATABASE, DATA_SOURCE } = config()

const collection = "todos"

const options = { 
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "api-key": FIRST_KEY
    },
    body: ""
}


const addTodo = async ({request,response}:Context) => {
    try {
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success: false,
                msg: "No Data",
            }
        }else{
            const body = await request.body()
            const todo = await body.value
            const URI = `${BASE_URI}/insertOne`
            const query = {
                collection,
                database:DATABASE,
                dataSource:DATA_SOURCE,
                document: todo
            }
            
            options.body = JSON.stringify(query)

            const dataResponse = await fetch(URI,options)
            const { insertedId } = await dataResponse.json()

            response.status = 201
            response.body = {
                success: true,
                data: todo,
                insertedId
            }

        }
    } catch (error) {
        response.body = {
            success: false,
            msg: error.toString()
        }
    }
}

const getTodo = async ({response}:Context) =>{
    try{
        const URI = `${BASE_URI}/find`
        const query = {
            collection,
            database:DATABASE,
            dataSource:DATA_SOURCE,
        }

        options.body = JSON.stringify(query)

        const dataResponse = await fetch(URI, options)
        const  {documents}  = await dataResponse.json()

        response.body = {URI, options}

        if(documents){
            response.status = 200
            response.body = {
                success: true,
                data:documents
            }
        }else{
            response.status = 500
            response.body = {
                success: false,
                msg:'Internal Server Error'
            }
        }
        
    }catch(error){
        response.body = {
            success: false,
            msg: error.toString()
        }
    }
}

const test = ({request,response}:Context) => {
    
    console.log('gg')
    response.body = 'pruebaaaaaaaaaaaaa'}

export { addTodo,getTodo,test }


