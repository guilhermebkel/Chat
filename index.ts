import express from 'express'
import { createServer } from 'http'
import socket from 'socket.io'
import path from 'path'
import ejs from 'ejs'

class Server {
    _app: any = express()
    _server: any = createServer(this._app)
    _io: any = socket(this._server)

    constructor(){
        this.serveStaticFiles()
        this.renderStaticFiles()
        this.startServer()
    }

    serveStaticFiles(){
        this._app.use(express.static(path.join(__dirname, 'public')))
        this._app.set('views', path.join(__dirname, 'public'))
        this._app.engine('html', ejs.renderFile)
        this._app.set('view engine', 'html')
    }

    renderStaticFiles(){
        this._app.use('/', (req, res) => {
            res.render('index.html')
        })
    }

    startServer(){
        this._server.listen(3000)
    }
}

new Server