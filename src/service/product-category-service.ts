import { ProductCategoryModel } from '../model/product-categories';
import AppError from '../middleware/app-error';
import { ProductModel } from '../model/products';

class ProductCategoryService {

    public createProductCategory = async (productCategoryName, productCategoryImage, uid, callback) => {
        try {
            const productCategory = new ProductCategoryModel();
            productCategory.categoryName = productCategoryName;
            productCategory.categoryImage = productCategoryImage ? productCategoryImage.path : ' ';
            productCategory.userId = uid;
            let iProductCategory = await productCategory.save();
            callback.onSuccess(iProductCategory, 'Category Successfully created', 201)
        } catch (e) {
            callback.onError(e);
        }
    };

    public getUserProductCategories = async (uid, callback) => {
        try {
            const productCategory = await ProductCategoryModel.find({userId: uid});
            return callback.onSuccess(productCategory, 'Retrieved User Product Categories', 200);
        } catch (e) {
            return callback.onError(e)
        }
    };

    public getAllProductCategories = async (data, callback) => {
        try {
            const productCategory = await ProductCategoryModel.find().populate('products');
            return callback.onSuccess(productCategory, 'Retrieved Product Categories', 200);
        } catch (e) {
            return callback.onError(e)
        }
    }

    public deleteProductCategoryById = async (id, callback) => {
        try {
            await ProductCategoryModel.deleteOne({_id: id}).exec();
            return callback.onSuccess({}, 'Product Category Successfully Deleted', 200);
        } catch (e) {
            return callback.onError(e)
        }
    }
    public updateProductCategoryById = async (id, token, productCategoryImage, body, callback) => {
        try {
            const iProduct = await ProductCategoryModel.findOne({_id: id}).exec();
            if (iProduct) {
                iProduct.categoryName = body.productCategoryName;
                iProduct.categoryImage = productCategoryImage ? productCategoryImage.path : ' ';
                iProduct.userId = token.uid;
            } else {
                console.log(new AppError('cannot find product category', 200))
            }
            await iProduct.save();
            return callback.onSuccess(iProduct, 'Product Category Successfully Updated', 200);
        } catch (e) {
            return callback.onError(e)
        }
    }
    public search = async (criteria, callback) => {
        try {
            const searchProductCategory = await ProductCategoryModel.find({$text: {$search: criteria}})
                // .skip(20)
                // .limit(10)
                .exec()
            callback.onSuccess(searchProductCategory, 'Search Result', 200)
        } catch (e) {
            callback.onError(e)
        }
    }

}

export default ProductCategoryService;
