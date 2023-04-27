const express = require('express');
const cors  = require('cors');
const {Server} = require('socket.io');
const http =  require('http')


const app = express();
app.use(cors());
const server = http.createServer(app)


const io =  new Server(server, {
    cors: {
        origin:'http://localhost:3000',
        methods :["get",'post']
    }
})

io.on('connection',(socket)=> {
    console.log(socket.id);

    socket.on('joinRoom', room =>socket.join(room))

    socket.on('newMsg',({newMsg , room})=>{
        console.log(room,newMsg)
        io.in(room).emit('getLetestMsg',newMsg)
    }) 
})


app.get('/api', (req, res) => {
    res.send({message: 'Hello from server'});
});

server.listen(4000, () => console.log('API running on localhost:4000'));