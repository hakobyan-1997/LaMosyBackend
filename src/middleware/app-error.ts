export default class AppError extends Error {
    private httpStatus: any;
    private __proto__: any;

    constructor(message, httpStatus) {
        const trueProto = new.target.prototype;
        super(message);

        this.httpStatus = httpStatus;
        this.__proto__ = trueProto;
    }
};
