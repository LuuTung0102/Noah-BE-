require('dotenv').config();
const cancelUrl = process.env.PAYMENT_CANCEL_URL;
const returnUrl = process.env.PAYMENT_RETURN_URL
export class PayosModel {
    orderCode: number;
    amount: number;
    description: string;
    items: Object;
    expiredAt: number;
    cancelUrl = cancelUrl;
    returnUrl = returnUrl;
    signature: string;
    
}