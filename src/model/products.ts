import { Document, model, Schema } from 'mongoose';

export interface IProduct extends Document {
    productName: string;
    productPicture: string;
    productPrice: number;
    productDescription: string;
    productStars: number;
    productColor: string;
    productItemsCount: number;
    productSize: number;
    productDiscount: string;
    productModelGender: string;
    productCategoryId: string;
    userId: string;
}

export const ProductSchema = new Schema({

    productName: {type: String},
    productPicture: {type: String},
    productPrice: {type: Number},
    productDescription: {type: String},
    productStars: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    productColor: {type: String},
    productItemsCount: {type: Number},
    productSize: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        default: 0
    },
    productDiscount: {type: String},
    productModelGender: {type: String},
    productCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'product-category',
        required: true
    },
    userId: {type: Schema.Types.ObjectId, required: true},
}, {
    versionKey: false, timestamps: true,
    toJSON: {
        transform(doc, ret) {
            Reflect.deleteProperty(ret, '_id');
            Reflect.deleteProperty(ret, '__v');
            Reflect.deleteProperty(ret, '__t');
            ret.productId = doc._id;
        }
    }
});
ProductSchema.index({'$**': 'text'});
const ProductModel = model<IProduct>('product', ProductSchema);

export { ProductModel };
