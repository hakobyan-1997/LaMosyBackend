import * as express from 'express'
import { Application } from 'express'
import * as mongoose from 'mongoose'

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;

        this.meddlers(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();
        this.databaseConnection();
    }

    private meddlers(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        });
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
        this.app.use('/uploads', express.static('uploads'));
    }

    private template() {
        this.app.set('view engine', 'pug')
    }

    private databaseConnection(): void {
        mongoose.connect(
            'mongodb://localhost:27017/tess',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        ).then(r => console.log('MongoDb started' + r)).catch((err) => {
            console.log('Mongodb not started' + err.error);
        });
        mongoose.set('useCreateIndex', true)
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
