require('dotenv').config()
// const express = require('express')
// const app = express()
const app = require('./app')
// const Result = require('./models/result')
// const cors = require('cors')
// const { response } = require('express')
// const HOST = process.env.IP
const http   = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT

//This file contains all information of api calls
//every call returns data in JSON format

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})