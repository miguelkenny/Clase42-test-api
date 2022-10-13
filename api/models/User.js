import mongoose from "mongoose";

class UserSchema extends mongoose.Schema {
    constructor() {
        const userSchema = super({
            username: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            nombre: { type: String, required: true },
            direccion: { type: String, required: true },
            edad: { type: Number, required: true },
            numCel: { type: String, required: true },
            file: { type: String },
            isAdmin: {
                type: Boolean,
                default: false,
            },
        },
            { timestamps: true }
        )
        return userSchema
    }
}

export default mongoose.model('User', new UserSchema);