import mongoose from "mongoose";

class CartSchema extends mongoose.Schema {
    constructor() {
        const cartSchema = super({
            cartID: { type: String, required: true },
            products: [{
                productId: { type: String },
                quantity: { type: Number, default: 1 }
            }]
        },
            { timestamps: true }
        )
        return cartSchema
    }
}

export default mongoose.model('Cart', new CartSchema)