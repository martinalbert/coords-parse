import http from 'http'
import config from './config'
import app from './app'
import connect from './db/connect'
import seed from './db/repos/postgres/seed'

const PORT = config.PORT || 3000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('server started on port: ' + PORT)

    // connect to DB (postgres)
    connect()
        .then(() => {
            // seed sample data
            return seed()
        })
        .catch(err => {
            throw Error(err)
        })
})

server.on('error', (err: Error) => {
    if (err) return console.error(err)
})
