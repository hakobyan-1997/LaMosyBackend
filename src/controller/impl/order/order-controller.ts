import * as express from 'express';
import TokenValidator from '../../../middleware/token-validator';
import ValidationResult from '../../../middleware/validation-result';
import ResponseManager from '../../../managers/response-manager';
import OrderService from '../../../service/order-service';

class OrderController {

    private path = '/order';
    private router = express.Router();
    private orderService: OrderService;
    private responseHandler: ResponseManager;

    constructor() {
        this.initRoutes();
        this.orderService = new OrderService();
    }


    private initRoutes() {
        /* Create Order */
        this.router.post(this.path, ValidationResult, TokenValidator(), this.createOrder);
        /* Get All Seller Orders */
        this.router.get(this.path + '/sellers', ValidationResult, TokenValidator(), this.getAllSellerOrders);
        /* Get All Buyer Orders */
        this.router.get(this.path + '/buyers', ValidationResult, TokenValidator(), this.getAllBuyerOrders);
        /* Delete Order */
        this.router.delete(this.path + '/:id', ValidationResult, TokenValidator(), this.deleteOrder);
    }

    private createOrder = async (req, res) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        let iOrder = await this.orderService.createOrder(req.body, req.session, this.responseHandler);
        res.status(201).json(iOrder);
    }
    private getAllSellerOrders = async (req, res) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        let iOrder = await this.orderService.getSellerOrders(req.session, this.responseHandler);
        res.status(200).json(iOrder);
    }
    private getAllBuyerOrders = async (req, res) => {
        this.responseHandler = ResponseManager.getResponseHandler(res)
        let iOrder = await this.orderService.getBuyerOrders(req.session, this.responseHandler);
        res.status(200).json(iOrder);
    }
    private deleteOrder = async (req, res) => {
        this.responseHandler = ResponseManager.getResponseHandler(res)
        await this.orderService.orderService(req.params.id, this.responseHandler);
    }
}

export default OrderController;
