// require dotenv to access enviroment ( process.env ) variables
import 'dotenv/config'

import http from 'http'
import app from './app'

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('server started on port: ' + PORT)
})

server.on('error', (err: Error) => {
    if (err) return console.error(err)
})