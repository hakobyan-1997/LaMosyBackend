import IControllerBase from '../../spec/i-base-controller';
import * as express from 'express';
import { Request, Response } from 'express';
import AuthenticationService from '../../../service/authentication-service';
import ResponseManager from '../../../managers/response-manager';

class AuthenticationController implements IControllerBase {

    public path = '/auth';
    public router = express.Router();
    private authService: AuthenticationService;

    constructor() {
        this.initRoutes();
        this.authService = new AuthenticationService();
    }

    initRoutes(): any {
        this.router.post(this.path + '/register', this.registerNewUser);
        this.router.post(this.path + '/login', this.login);
    }

    private registerNewUser = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let iUser = await this.authService.register(req.body, responseHandler);
        res.status(201).json(iUser);
    };

    private login = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let iUser = await this.authService.login(req.body.email, req.body.password, responseHandler);
        res.status(200).json(iUser);
    }

}

export default AuthenticationController;
