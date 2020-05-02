import ResponseManager from '../managers/response-manager';
import AppError from './app-error';
import Constants from '../constant/constants';
import { UserModel } from '../model/users';
import { Tokenizer } from '../managers/tokenizer';

const TokenValidator = () => async (req: any, res: any, next) => { // role
    const responseHandler = ResponseManager.getResponseHandler(res);
    const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
    if (token) {
        try {
            const decoded: any = await Tokenizer.decode(token, Constants.secret);
            if (decoded.uid) {
                const user = await UserModel.findOne({_id: decoded.uid});
                if (user ) {//&& (!role || role.includes(user.role))
                    req.session = decoded;
                    next();
                } else {
                    return responseHandler.onError(new AppError('Invalid credentials', 401), {});
                }
            } else {
                return responseHandler.onError(new AppError('Invalid Access Token.', 403), {});
            }
        } catch (e) {
            return responseHandler.onError(new AppError('Invalid Access Token.', 401), {});
        }
    } else {
        return responseHandler.onError(new AppError('No Access Token.', 401), {});
    }
};
export default TokenValidator;
