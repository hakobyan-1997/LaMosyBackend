import { OrderModel } from '../model/orders';
import { ProductModel } from '../model/products';

class OrderService {

    public createOrder = async (body, token, callback) => {
        try {
            const order = new OrderModel();
            order.productId = body.productId;
            order.productQuantity = body.productQuantity;
            order.deliveryDate = this.addDays(new Date(), 3);
            order.sellerId = body.sellerId;
            order.buyerId = token.uid;
            order.productQuantity = body.productQuantity;
            order.totalPrice = body.totalPrice;
            order.city = body.city;
            order.country = body.country;
            order.address = body.address;
            order.region = body.region;
            order.phone = body.phone;
            order.buyerName = body.buyerName;
            let MyOrder = await order.save();
            const productDetails = await ProductModel.find({_id: body.productId})
            callback.onSuccess({
                savedOrder: MyOrder,
                productDetails
            }, 'Order successfully created', 201);
        } catch (e) {
            callback.onError(e);
        }
    }
    public getSellerOrders = async (token, callback) => {
        try {
            let orders = await OrderModel.find({sellerId: token.uid}).populate('productId');
            console.log(orders)
            callback.onSuccess(orders, 'All Seller Orders', 200);
        } catch (e) {
            callback.onError(e)
        }
    }

    public getBuyerOrders = async (token, callback) => {
        try {
            let orders = await OrderModel.find({buyerId: token.uid}).populate('productId')
            callback.onSuccess(orders, 'All Buyer Orders', 200)
        } catch (e) {
            callback.onError(e)
        }
    }
    public orderService = async (id, callback) => {
        try {
            await OrderModel.deleteOne({_id: id}).exec();
            callback.onSuccess({}, 'Order Successfully Deleted', 200);
        } catch (e) {
            callback.onError(e)
        }
    }


    addDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() + numDays);
        return dateObj;
    }

}

export default OrderService;
