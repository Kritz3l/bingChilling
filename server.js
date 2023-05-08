const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8888;
const backend = express();
const frontend = express();
const frontendport = 3000;
const path = require('path');

backend.use(express.json());
backend.use(express.urlencoded({ extended: true}));
backend.use(cors());

const AuthRoutes = require('./routes/authRoutes.js');
backend.use('/api', cors(), AuthRoutes);

backend.listen(PORT, () => {
    console.log(`Backend listening on localhost:${PORT} (^._.^)`);
});

frontend.listen(frontendport, () => {
    console.log(`Frontend listening on localhost:${frontendport}`)
})

/*frontend.get('/', (req, res) => {
    //res.send('Hello World')
    res.sendFile(path.join(__dirname, '/public/page.html'))
    //res.sendFile(path.join(__dirname, '/public/page.js'))
    //res.sendFile(path.join(__dirname, '/public/style.css'))
})*/

//frontend.use('/', express.static('public'));