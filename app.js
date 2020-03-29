const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 8080;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let tileData = [
    {
        id: 1,
        img: 'https://www.sweetmemoriesdelivered.uk/ekmps/shops/c751f7/images/cadbury-creme-egg-medium-easter-egg-138g-6185-1-p.jpg',
        title: 'Cadbury Creme Egg',
        quantity: 5,
    },
    {
        id: 2,
        img: 'https://assets.iceland.co.uk/i/iceland/cadbury_mini_eggs_medium_easter_egg_130g_78580_T1.jpg',
        title: 'Cadbury Mini Eggs',
        quantity: 5,
    },
    {
        id: 3,
        img: 'https://images-na.ssl-images-amazon.com/images/I/51tVRvRHBWL._SX425_.jpg',
        title: 'Cadbury Caramel',
        quantity: 5,
    },
    {
        id: 4,
        img: 'https://www.cadburygiftsdirect.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/u/buttons-medium-egg-19_1.jpg',
        title: 'Cadbury Dairy Milk Buttons',
        quantity: 0,
    },
    {
        id: 5,
        img: 'https://images-na.ssl-images-amazon.com/images/I/51o38WFxtUL._SX385_.jpg',
        title: 'Maltesers easter egg',
        quantity: 5,
    },
    {
        id: 6,
        img: 'https://www.britishcornershop.co.uk/img/large/MAR177.jpg',
        title: 'Mars easter egg',
        quantity: 5,
    },
];


io.on("connection", socket => {
    console.log("New client connected");

    socket.emit("updatedOptions", tileData);

    socket.on("optionSelection", (selected) => {
        tileData = tileData.map((item) => item.id === selected.id ? { ...item, quantity: item.quantity -1 } : item);
        socket.broadcast.emit("updatedOptions", tileData);
        socket.emit("completed", true);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

