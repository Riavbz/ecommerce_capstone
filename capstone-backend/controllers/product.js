// capstone-backend/controllers/product.js
import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'capstone-example'
    };
     // Convert buffer to base64 string
    const base64Image = image.buffer.toString('base64');
    const dataUri = `data:${image.mimetype};base64,${base64Image}`;
    console.log(image)
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(dataUri, options);

        const data = {
            url: result.secure_url,
            altText: `Image of ${result.display_name}`,
        };

        return data;

    } catch (error) {
        console.error(error);
    }
}

export const getProducts = async (req, res) => {
    try {
        const { categories } = req.query;
        const filter = {};

        if (categories) filter.categories = categories;

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const createProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        const uploadImages = [];
        for (const file of req.files) {
            uploadImages.push(await uploadImage(file));
        };

        const fullDesc = req.body.description || "";
        const shortDesc = fullDesc.length < 157 ? fullDesc : `${fullDesc.substring(0, 157)}...`;
        const categoryData = Array.isArray(req.body.category) ? req.body.category 
            : [req.body.category];

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: uploadImages,
            shortDescription: shortDesc,
            description: fullDesc, 
            category: categoryData
        });

        // console.log(product);
        // console.log(product.images);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};