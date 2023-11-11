const express = require("express");
const router = require("./routes/index");

const server = express();

// Middlewares
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

// En lugar de usar body-parser
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// server.use(express.json());
server.use("/rickandmorty", router);

module.exports = server;