import mongoose from 'mongoose';

export const PRODUCT_CATEGORIES = ['Marine', 'Farm', 'Llamapalooza'];

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: [{
        url: String,
        altText: String,
    }],
    category: {
        type: [String],
        required: true,
        validate: {
            validator: function(categories) {
                return categories.length > 0 && categories.every(category => PRODUCT_CATEGORIES.includes(category));
            },
            message: props => `Invalid categories: ${props.value}`,
        }
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;