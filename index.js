import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/Users.js';
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import Stripe from 'stripe'
import { v4 as uuid } from 'uuid'

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: "true" }))
app.use(cors());

app.get("/", (req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use("/user", userRoutes)
app.use("/questions", questionRoutes)
app.use("/answer", answerRoutes)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const stripe = Stripe(process.env.STRIPE_KEY)


app.post("/checkout-gold", async (req, res) => {
    let error, status;
    try {
        const [token, product, user] = req.body;
        const customer = await stripe.customers.create({
            email: user.email,
            source: token.id,
        })
        const key = v4();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line_1,
                    line2: token.card.address_line_2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_city,
                }
            }
        },
            {
                key,
            }
        );

        console.log("Charge", { charge })
        status = "success";
    } catch (error) {
        console.log(error)
        status = "failure";
    }
    res.json({ error, status })
})

app.post("/checkout-silver", async (req, res) => {
    let error, status;
    try {
        const [token, silver] = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })
        status = "success";
    } catch (error) {
        console.log(error)
        status = "failure";
    }
    res.json({ error, status })
})

const PORT = process.env.PORT || 5002;

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((err) => console.log(err.message))
