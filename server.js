const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8888;
const application = express();
const frontend = express();
const frontendport = 3000;

application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cors());

const AuthRoutes = require('./routes/authRoutes.js');
application.use('/api', cors(), AuthRoutes);

application.listen(PORT, () => {
    console.log(`Backend listening on localhost:${PORT} (^._.^)`);
});

frontend.listen(frontendport, () => {
    console.log(`Frontend listening on localhost:${frontendport}`)
})

frontend.get('/', (req, res) => {
    res.send('Hello World')
})