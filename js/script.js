const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');


let server = http.createServer(function(req, res) {
    let page = url.parse(req.url).pathname;
    let filePath = path.join(__dirname, page);

    if (page === "/") {
        fs.readFile("index.html", "utf-8", function(error, content) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(content);
        });
    }
    else {
        fs.readFile(filePath, 'utf-8', function(error, content) {
            //res.writeHead(200);
            res.end(content);
        })
    }
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('un utilisateur s\'est connecté');
});


server.listen(3000, () => console.log("Server prêt !"));