import express from "express"
import cookieParser from "cookie-parser"
import path from "path"

import authRoute from "./router/auth.router.js"
import messageRoute from "./router/message.router.js"
import userRoutes from "./router/user.router.js"

import ConnectToMongo from "./DB/db.js";
ConnectToMongo();

import { app, server } from "./Socket/Socket.js"

let port = process.env.PORT || 5000;

const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/client/build")))

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"client","build","index.html"))
})

// app.get("/",(req,res)=>{
//     res.send("hello welcome to the backend world")
// })

ConnectToMongo();
server.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
