import { Router } from 'express';
import Cart from '../models/Cart.js'
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js';

const routes = Router();

//CREATE CART
routes.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json({ error })
    }
})

//UPDATE
routes.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        )

        res.status(200).json(updatedCart)

    } catch (error) {
        res.status(500).json({ error })
    }
})

//ELIMINAR CARRITO
routes.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Carrito eliminado exitosamente...')
    } catch (error) {
        res.status(500).json({ error })
    }
})

//GET USER CART BY ID
routes.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })

        res.status(200).json(cart)

    } catch (error) {
        res.status(500).json({ error })
    }
})

//GET ALL
routes.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)

    } catch (error) {
        res.status(500).json(error)
    }
})

export default routes;