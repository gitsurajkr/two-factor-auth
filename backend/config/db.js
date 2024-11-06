const mongoose = require('mongoose')
// const User = require('../model/schema')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(() =>
        console.log("Database connected Successfully")
    ).catch((err) =>
        console.log("Failed to connect to database", err)
)