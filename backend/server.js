const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./config/db')

const router = require('./routes/index')
const app = express();
app.use(cookieParser())
app.use(express.json());

app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));


app.use('/api', router)

app.listen(3737, () => {
    console.log('Server is running on Port 3737')
} )

module.exports = app;