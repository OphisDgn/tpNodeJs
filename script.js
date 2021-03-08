const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

/* FONCTION POUR L'UTLISATION DES COOKIES */
function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(msg) {
    var cook = getCookie("datas");
    if (cook != "") {
      io.emit('chatMsg', msg);
    } else {
      if (msg != "" && msg != null) {
        setCookie("datas", msg);
      }
    }
}


io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté !');

    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté !");
    });
    socket.on('chatMsg', (msg) => {
        //io.emit('chatMsg', msg);
        checkCookie(msg);
    });
})



server.listen(3000, () => {
    console.log('Ecoute sur le port 3000');
});