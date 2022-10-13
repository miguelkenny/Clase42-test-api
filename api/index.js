import express from 'express'
import mongoose from 'mongoose'
import {config} from 'dotenv'
import routes from './routes/user.js'
import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/order.js'
import stripeRoutes from './routes/stripe.js'
import cors from 'cors'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => { console.log('DB Connection Successfull!'); })
    .catch((err) => {
        console.log('DB Connection Failure: ' + err.message);
    });

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, './upload')))

app.use('/api/auth', authRoutes)
app.use('/api/users', routes)
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/checkout', stripeRoutes)

app.listen(process.env.PORT || 5000, () => {
    console.log('Backend server listening on port 5000');
});