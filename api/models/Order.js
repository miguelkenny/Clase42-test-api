import mongoose from "mongoose";

class OrderSchema extends mongoose.Schema {
    constructor() {
        const orderSchema = super(
            {
                userID: { type: String, required: true },
                products: [{
                    productId: {
                        type: String
                    },
                    quantity: {
                        type: Number,
                        default: 1,
                    }
                }],
                amount: { type: Number, required: true },
                address: { type: Object, required: true },
                status: { type: String, default: 'pending' },
            },
            { timestamps: true }
        )
        return orderSchema
    }
}

export default mongoose.model('Order', new OrderSchema);