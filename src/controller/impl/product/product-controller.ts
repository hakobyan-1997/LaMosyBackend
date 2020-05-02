import IControllerBase from '../../spec/i-base-controller';
import * as express from 'express';
import ProductService from '../../../service/product-service';
import { mult } from '../../../middleware/image-middleware';
import ResponseManager from '../../../managers/response-manager';
import TokenValidator from '../../../middleware/token-validator';
import ValidationResult from '../../../middleware/validation-result';
import { Request, Response } from 'express';

class ProductController implements IControllerBase {

    private path = '/product';
    private router = express.Router();
    private productService: ProductService;
    private responseHandler: ResponseManager;

    constructor() {
        this.initRoutes();
        this.productService = new ProductService();
    }

    initRoutes(): any {
        /* Create Product */
        this.router.post(this.path + '/:productCategoryId', mult.single('productPicture'),
            ValidationResult,
            TokenValidator(),
            this.createProduct);
        /* Get Products By Their Category */
        this.router.get(this.path + '/:productCategoryId',
            this.getProductsByCategory);
        /*Get All Products */
        this.router.get(this.path,
            ValidationResult,
            TokenValidator(),
            this.getAllProducts);
        /* Delete Product By Id */
        this.router.delete(this.path + '/:id',
            ValidationResult,
            TokenValidator(),
            this.deleteProduct);
        /* Update Product By Id */
        this.router.put(this.path + '/:id', mult.single('productPicture'),
            ValidationResult,
            TokenValidator(),
            this.updateProduct);//searchProduct
        /* Search Product */
        this.router.get(this.path + '/search/:criteria', this.searchProduct);
    }

    private createProduct = async (req: any, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let product = await this.productService.createProduct(
            req.body,
            req.session,
            req.params.productCategoryId,
            req.file,
            responseHandler
        );
        res.status(201).json(product);
    };

    private getProductsByCategory = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        const iProducts = await this.productService.getAllProductsByTheirCategory(
            req.params.productCategoryId,
            responseHandler
        );
        res.status(200).json(iProducts);
    }

    private getAllProducts = async (req: Request, res: Response) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        const allProducts = await this.productService.getAllProducts(req, this.responseHandler);
        res.json(allProducts);
    }
    private deleteProduct = async (req: Request, res: Response) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        await this.productService.deleteProductById(req.params.id, this.responseHandler);
    }
    private updateProduct = async (req: any, res: Response) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        await this.productService.updateProductById(req.params.id, req.body, req.file, this.responseHandler);
    }
    private searchProduct = async (req: Request, res: Response) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        await this.productService.search(req.params.criteria, this.responseHandler);
    }
}

export default ProductController;
