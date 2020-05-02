import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    role: number;
    picture: string;
    status: number;
    phone: string;
    isDisabled: boolean;
}

export class Roles {
    static Admin: 1;
    static User: 2;
}

export const UserSchema = new Schema({
    name:       { type: String },
    username:   { type: String },
    email:      { type: String },
    password:   { type: String, required: true },
    role:       { type: Number, default: Roles.User },
    picture:    { type: String },
    phone:      { type: String },
    isDisabled: { type: Boolean, default: false }
}, {
    versionKey: false, timestamps: true,
    toJSON: {
        transform(doc, ret) {
            Reflect.deleteProperty(ret, '_id');
            Reflect.deleteProperty(ret, '__v');
            Reflect.deleteProperty(ret, '__t');
            ret.userId = doc._id;
        }
    }
});

const UserModel = model<IUser>('user', UserSchema);

export { UserModel };
