const express= require("express")
const dotenv=require("dotenv")
const swaggerUi= require("swagger-ui-express")
const DBCon= require("./app/config/db")

const swaggerDocument = require("./swagger.json")
dotenv.config()


DBCon()

const app= express()
app.use(express.json())

const TodoRoutes=require("./app/routes/TodoRoutes")
app.use("/api",TodoRoutes)


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const port=4000
 
app.listen(port,()=>{
    console.log(`server running on http://localhost${port}`)
    console.log(`swagger ui- http://localhost:${port}/api-docs`)
})