import { Document, model, Schema } from 'mongoose';

export interface IAddress extends Document {
    countryName: string,
    street: string,
    zipCode: string,
    city: string
    lat: number,
    lng: number
}

export const AddressSchema = new Schema({

    countryName: {type: String, default: 'Armenia'},
    street: {type: String},
    zipCode: {type: String},
    city: {type: String, default: 'Yerevan'},
    lat: {type: Number, default: 0},
    lng: {type: Number, default: 0},
}, {
    versionKey: false, timestamps: true,
    toJSON: {
        transform(doc, ret) {
            Reflect.deleteProperty(ret, '_id');
            Reflect.deleteProperty(ret, '__v');
            Reflect.deleteProperty(ret, '__t');
            ret.addressId = doc._id;
        }
    }
});
const AddressModel = model<IAddress>('address', AddressSchema);

export { AddressModel };
