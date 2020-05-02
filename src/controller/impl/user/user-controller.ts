import * as express from 'express';
import { Request, Response } from 'express';
import UserService from '../../../service/user-service';
import IControllerBase from '../../spec/i-base-controller';
import ResponseManager from '../../../managers/response-manager';

class UserController implements IControllerBase {

    public path = '/user';
    public router = express.Router();
    private userService: UserService;

    constructor() {
        this.initRoutes();
        this.userService = new UserService();
    }

    public initRoutes(): void {
        this.router.get(this.path, this.createUser);
    }

    private createUser = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let iUser = await this.userService.createUser(req, responseHandler);
        res.status(200).json(iUser);
    }

}

export default UserController;
