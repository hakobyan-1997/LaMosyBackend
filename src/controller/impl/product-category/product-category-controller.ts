import IControllerBase from '../../spec/i-base-controller';
import * as express from 'express';
import { Request, Response } from 'express';
import ProductCategoryService from '../../../service/product-category-service';
import ResponseManager from '../../../managers/response-manager';
import ValidationResult from '../../../middleware/validation-result';
import TokenValidator from '../../../middleware/token-validator';
import { mult } from '../../../middleware/image-middleware';

class ProductCategoryController implements IControllerBase {

    private path = '/product-category';
    private router = express.Router();
    private productCategoryService;

    constructor() {
        this.initRoutes();
        this.productCategoryService = new ProductCategoryService();
    }

    initRoutes(): any {
        this.router.post(this.path, mult.single('productCategoryImage'), ValidationResult, TokenValidator(),
            this.createProductCategory);
        this.router.get(this.path, ValidationResult, TokenValidator(), this.userProductCategories);
        this.router.get(this.path + '/all', this.allProductCategories);
        this.router.delete(this.path + '/:id', ValidationResult, TokenValidator(), this.deleteProductCategory);
        this.router.put(this.path + '/:id', mult.single('productCategoryImage'),
            ValidationResult, TokenValidator(), this.updateProductCategory);
        this.router.get(this.path + '/search/:criteria', this.searchProductCategory);

    }

    private createProductCategory = async (req: any, res: any) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let productCategory = await this.productCategoryService.createProductCategory(
            req.body.productCategoryName,
            req.file,
            req.session.uid,
            responseHandler
        );
        res.status(201).json(productCategory);
    };

    private userProductCategories = async (req: any, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let productCategory = await this.productCategoryService.getUserProductCategories(req.session.uid, responseHandler);
        res.status(200).json(productCategory);

    };

    private allProductCategories = async (req: any, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let productCategory = await this.productCategoryService.getAllProductCategories(req, responseHandler);
        res.status(200).json(productCategory);
    }


    private deleteProductCategory = async (req, res) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        await this.productCategoryService.deleteProductCategoryById(req.params.id, responseHandler)
    }

    private updateProductCategory = async (req, res) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        await this.productCategoryService.updateProductCategoryById(req.params.id, req.session, req.file, req.body, responseHandler);
    }
    private searchProductCategory = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        await this.productCategoryService.search(req.params.criteria, responseHandler);
    }
}

export default ProductCategoryController;
