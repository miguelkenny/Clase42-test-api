import { Router } from 'express'
import {config} from 'dotenv'
import Stripe from 'stripe';
import sendInfoEmail from '../Nodemailer/SendEmail.js'

config()

const routes = Router()
const stripeTets = new Stripe(process.env.STRIPE_KEY);

routes.post('/payment', (req, res) => {
    const sale = 2
    sendInfoEmail(req.body, sale)
    stripeTets.charges.create(
        {
            source: req.body.tokenId.id,
            amount: req.body.cart.total,
            currency: 'usd',
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr)
            } else {
                res.status(200).json(stripeRes)
            }
        }
    )
})

export default routes