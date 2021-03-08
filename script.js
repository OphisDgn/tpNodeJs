const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté !');

    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté !");
    });
    socket.on('chatMsg', (msg) => {
        io.emit('chatMsg', msg);
    });
})



server.listen(3000, () => {
    console.log('Ecoute sur le port 3000');
});