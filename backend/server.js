const express = require('express')
require('dotenv').config()
const cors = require('cors')


const app = express();
const PORT = process.env.PORT || 5002


app.use(cors())
app.use(express.json())


app.get('/api/youtube', (_, res) => {
    res.send({
        msg: 'Hello les putes'
    })
})

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
})