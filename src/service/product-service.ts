import { ProductModel } from '../model/products';
import AppError from '../middleware/app-error';

class ProductService {

    public createProduct = async (data, token, productCategoryId, productPicture, callback) => {
        try {
            const product = new ProductModel();
            product.productName = data.productName;
            product.productPicture = productPicture ? productPicture.path : ' ';
            product.productPrice = data.productPrice;
            product.productDescription = data.productDescription;
            product.productStars = data.productStars;
            product.productColor = data.productColor;
            product.productItemsCount = data.productItemsCount;
            product.productSize = data.productSize;
            product.productDiscount = data.productDiscount;
            product.productModelGender = data.productModelGender;
            product.productCategoryId = productCategoryId;
            product.userId = token.uid;
            let iProduct = await product.save();
            callback.onSuccess(iProduct, 'Product Successfully created', 201);
        } catch (e) {
            callback.onError(e);
        }
    };
    public getAllProductsByTheirCategory = async (productCategoryId, callback) => {
        try {
            const productsWithCategory = await ProductModel.find({productCategoryId: productCategoryId});
            callback.onSuccess(productsWithCategory, `Products of Category Reprieved`, 200);
        } catch (e) {
            callback.onError(e);
        }
    }

    public getAllProducts = async (res, callback) => {
        try {
            const allProducts = await ProductModel.find({});
            callback.onSuccess(allProducts, `Product List`, 200);
        } catch (e) {
            callback.onError(e);
        }
    }
    public deleteProductById = async (id, callback) => {
        try {
            const product = await ProductModel.deleteOne({_id: id}).exec();
            callback.onSuccess({}, 'Product Successfully Deleted', 200);
        } catch (e) {
            callback.onError(e);
        }
    }

    public updateProductById = async (id, body, productPicture, callback) => {
        try {
            const product = await ProductModel.findOne({_id: id}).exec();
            if (product) {
                product.productName = body.productName;
                product.productPicture = productPicture ? productPicture.path : ' ';
                product.productPrice = body.productPrice;
                product.productDescription = body.productDescription;
                product.productStars = body.productStars;
                product.productColor = body.productColor;
                product.productItemsCount = body.productItemsCount;
                product.productSize = body.productSize;
                product.productDiscount = body.productDiscount;
                product.productModelGender = body.productModelGender;
                product.userId = id;
                const iUpdatedProduct = await product.save();
                callback.onSuccess(iUpdatedProduct, 'Product Successfully Updated', 200);
            } else {
                console.log(new AppError('cannot update category', 200))
            }
        } catch (e) {
            callback.onError(e);
        }
    }

    public search = async (criteria, callback) => {
        try {
            const products = await ProductModel.find({$text: {$search: criteria}})
                // .skip(20)
                // .limit(10)
                .exec()
            callback.onSuccess(products, 'Search Result', 200)
        } catch (e) {
            callback.onError(e)
        }
    }
}

export default ProductService;
