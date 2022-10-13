import mongoose from "mongoose";

class ProductSchema extends mongoose.Schema {
    constructor() {
        const productSchema = super(
        {
            title: { type: String, required: true, unique: true },
            desc: { type: String, required: true },
            img: { type: String, required: true },
            categories: { type: Array },
            size: { type: Array },
            color: { type: Array },
            price: { type: Number, required: true },
            inStock: { type: Boolean, default: true}
        },
            { timestamps: true }
        )
        return productSchema
    }
}

export default mongoose.model('Product', new ProductSchema);