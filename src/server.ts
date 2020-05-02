import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import UserController from './controller/impl/user/user-controller';
import AuthenticationController from './controller/impl/user/authentication-controller';
import ProductCategoryController from './controller/impl/product-category/product-category-controller';
import ProductController from './controller/impl/product/product-controller';
import OrderController from './controller/impl/order/order-controller';

const app = new App({
    port: 5555,
    controllers: [
        new UserController(),
        new AuthenticationController(),
        new ProductCategoryController(),
        new ProductController(),
        new OrderController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        loggerMiddleware,
        // ValidationResult,
        // TokenValidator
    ]
});

app.listen();
