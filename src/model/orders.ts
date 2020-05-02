import { Document, model, Schema } from 'mongoose';

export interface IOrder extends Document {
    order: string;
    productId: string,
    productQuantity: number,
    totalPrice: string,
    volute: string
    deliveryDate: Date,
    sellerId: string,
    buyerId: string;
    buyerName: string;
    address: string;
    city: string;
    region: string;
    country: string;
    phone: string

}

export const OrderSchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    productQuantity: {
        type: Number
    },
    volute: {
        type: String
    },
    deliveryDate: {
        type: Date
    },
    totalPrice: {
        type: String
    },

    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    buyerName: {type: String},
    address: {type: String},
    city: {type: String},
    region: {type: String},
    country: {type: String},
    phone: {type: String}

}, {
    versionKey: false, timestamps: true,
    toJSON: {
        transform(doc, ret) {
            Reflect.deleteProperty(ret, '_id');
            Reflect.deleteProperty(ret, '__v');
            Reflect.deleteProperty(ret, '__t');
            ret.orderId = doc._id;
        }
    }
});
const OrderModel = model<IOrder>('order', OrderSchema);

export { OrderModel };
