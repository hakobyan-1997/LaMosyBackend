import { Document, model, Schema } from 'mongoose';
import { ProductSchema } from './products';


export interface ProductCategories extends Document {
    categoryName: string;
    categoryImage: string;
    userId: string;
}

export const ProductCategorySchema = new Schema({
    categoryName: {type: String},
    categoryImage: {type: String},
    userId: {type: Schema.Types.ObjectId, required: true},
}, {
    versionKey: false, timestamps: true,
    toJSON: {
        transform(doc, ret) {
            Reflect.deleteProperty(ret, '_id');
            Reflect.deleteProperty(ret, '__v');
            Reflect.deleteProperty(ret, '__t');
            ret.productCategoryId = doc._id;
        }
    }
});

ProductCategorySchema.index({'$**': 'text'});
const ProductCategoryModel = model<ProductCategories>('product-category', ProductCategorySchema);

export { ProductCategoryModel };
