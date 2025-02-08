require('dotenv').config()
const express = require('express')
const cors = require('cors')

const psServer = express()
psServer.use(cors())
psServer.use(express.json())
PORT = 4000 || process.env.PORT

psServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    })
    