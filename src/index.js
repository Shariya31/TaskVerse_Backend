import http from 'http'
import {Server as SocketServer} from 'socket.io'
import app from './app.js'
import connectDB from './config/connectDb.js';

const PORT = process.env.PORT || 4300;
const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    },
});

io.on('connection', socket =>{
    console.log(`socket connected ${socket.id}`)

    socket.on('disconnect', ()=>{
        console.log(`socket disconnected ${socket.id}`)
    })
})

const mongoUri = process.env.MONGO_URI || ""
connectDB(mongoUri)

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

