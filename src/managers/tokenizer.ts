import TokenManager from './token-manager';
import Constants from '../constant/constants';

const Tokenizer = new TokenManager(
    Constants.secret,
    {
        expiresIn: 60 * 60 * 24,
        algorithm: 'HS256',
        noTimestamp: false
    }
);
export { Tokenizer }
