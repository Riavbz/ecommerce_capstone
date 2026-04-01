import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Local imports
import connectDB from './config/db.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import Product from './models/Product.js';
import User from './models/User.js';

const app = express();
const port = process.env.PORT || 3500;
const dbUrl = process.env.DB_URL;


// Connect to MongoDB
mongoose.connect(dbUrl)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Capstone Backend API');    
});

//Routes
app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' })
    }
});

// HTTP PUT Endpoint on /items/:id route
app.put("/products/:id", async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, newProduct, { new: true });
        if(!updatedProduct) {
            return res.status(404).json({ error: "Product not found in database" });
        }
        res.status(200).json({ data: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// HTTP DELETE Endpoint on /products/:id route
app.delete("/products/:id", async(req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) return res.status(404).json({ error: "Item not found" });
        res.status(200).json({ data: { message: "Deleted", id: req.params.id } });
    } catch (error) {
       res.status(500).json({ error: error.message }); 
    }
});

app.post("/signup", async (req, res) => {
    try {
        const payload = {
            email: req.body.email.trim().toLowerCase(), 
            username: req.body.username.trim().toLowerCase(),
            password: req.body.password.trim(),
        }
        const newUser = new User(payload); // creates new user object to be saved in DB
        await newUser.save(); // save the object in DB
        const response = {
            _id: user._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            login: true,
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
       const email = req.body.email.trim().toLowerCase(); // remove whitespace and convert to lowercase
       const password = req.body.password;
       const user = await User.findOne({ email, password }); // searches collection for email and password combination
       if(!user) { // only runs if credentials are INCORRECT
        return res.status(404).json({ error: "Invalid credentials, check your email and password combination" });
       }
       const response = {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        login: true,
       }
       res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// app.post("/checkout-session", async (req, res) => {
//     try {
//         const { cartItems } = req.body;
//         const line_items = cartItems.map((item) => ({
//             price_data: {
//                 currency: "USD",
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: Math.round(item.price * 100), // converting to USD and rounding it
//             },
//             quantity: 1, // you would put item.quantity
//         }));
//     }});

app.listen(port, () => {
    connectDB();
    console.log(`Server running on http://localhost:${port}`);
});
