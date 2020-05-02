import ResponseManager from "../managers/response-manager";
import { Request, Response } from 'express';

import { validationResult } from "express-validator";
import AppError from "./app-error";


const ValidationResult = (req: Request, res: Response, next) => {
    const responseHandler = ResponseManager.getResponseHandler(res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseHandler.onError(
            new AppError('Validation Error', 403),
            {errors: errors.mapped()});
    }
    next();
};

export default ValidationResult
