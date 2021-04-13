const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { MongoDb, MongoClient} = require('mongodb');

// ! Je n'arrive pas à me connecter avec MongoCompass
// Même en ne mettant que " mongodb://localhost:27017 " 

const uri = 'mongodb://localhost:27017/MongoDb';
const client = new MongoClient(uri);

client.connect((err, instance) => {
    if (err) {
        process.exit(1);
    } else {
        app.get("/", (req, res) => res.redirect('/chat'))

        const db = instance.db('MongoDb');
        const collection = db.collection('MsgChats');
        collection.insertOne({Pseudo: 'Steve', Message: 'Hello World'}); 

        /*
        
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
        })*/
        server.listen(3000, () => {
            console.log('Ecoute sur le port 3000');
        });
    }
})






