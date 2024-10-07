import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { Server } from "socket.io"
import { createServer} from "http"
import cors from "cors"

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],  // Autorise les méthodes GET et POST
    credentials: true 
}))

const server = createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`✅ Websocket Server running at ${process.env.HOST}: ${process.env.PORT}`)
})

const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",  
            methods: ["GET", "POST"], 
            credentials: true
        }
})

io.on("connection", (socket) => {
    socket.on("users", (msg) => {
        io.emit("users", msg)
    })

    socket.on("notes", (msg) => {
        io.emit("notes", msg)
    })
})