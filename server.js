const app = require("./src/app")
const http = require("http")
const socketio = require('socket.io')
const express = require("express")
const path = require("path")

const server = http.createServer(app)

const io = socketio(server)

app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("index")
})


io.on("connection",function (socket){
    
    socket.on("send-location",function (data){
        io.emit("recive-location",{id:socket.id,...data})
    })

    socket.on("disconnect",function(){
        io.emit("user-disconnect",socket.id)
    })
    
})

server.listen(3000,()=>{
    console.log("server is runing on port 3000");
    
})