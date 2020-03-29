const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const format = require('pg-format');

const port = process.env.PORT || 8080;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const { executeQuery } = require('./db');
const { e } = require('./e');


const selectSql = () => executeQuery(`
select e.id, e.title, e.url, e.quantity - count(es.egg_id) as quantity from eggs e
    LEFT OUTER JOIN eggsselection es on e.id = es.egg_id
group by e.id
order by e.id;
`);

const insertSql = ({ name, eggId }) => executeQuery(format(`
INSERT INTO eggsselection (name, egg_id) VALUES (%L, %L);
`, name, eggId));


io.on("connection", socket => {
    console.log("New client connected");

    selectSql().then(data => {
        socket.emit("updatedOptions", data);
    });

    socket.on("optionSelection", (selected, name) => {
        insertSql({ name: e(name), eggId: selected.id}).then(() => {
            selectSql().then(data => {
                socket.broadcast.emit("updatedOptions", data);
                socket.emit("completed", true);
            });
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));