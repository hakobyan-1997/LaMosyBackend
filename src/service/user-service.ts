import { UserModel } from '../model/users';

class UserService {

    async createUser(data, callback) {
        try {
            const user = new UserModel();
            user.name = 'Arayik';
            await user.save();
            return callback.onSuccess(user, 'User Saved', 201)
        } catch (error) {
            return callback.onError(error)
        }
    }

}

export default UserService;
