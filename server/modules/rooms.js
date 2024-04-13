const ws = require("ws");
const wss = new ws.Server({
    port: 5000
});

//Keep alive by pinging server every 5 seconds
setInterval(() => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify({error: false, message: "ping"}));
    });
}, 5000);

wss.on("connection", (ws, req) => {
    ws.on("message", (message) => {
        message = JSON.parse(message);
        if(message.type == "init") {
            ws.username = message.username;
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            ws.id = s4() + s4() + "-" + s4();
            rooms.findOne({room_id: parseInt(message.room_id)}, (err, data) => {
                if(err) {
                    ws.send(JSON.stringify({error: true, message: "An error occured!"}));
                }
                if(data == null) {
                    ws.send(JSON.stringify({error: true, message: `There is no room with the id: ${message.room_id}`}));
                } else {
                    participants.insert({
                        room_id: parseInt(message.room_id),
                        username: ws.username,
                        id: ws.id
                    });
                    ws.send(JSON.stringify({error: false, message: `Connected succesfully!`}));
                }
            });
        }
    });

    ws.on('close', () => {
        participants.remove({id: ws.id}, {}, (err, numRemoved) => {
            if(err) {
                console.log(err);
            }
        });
        participants.loadDatabase();
    });
});