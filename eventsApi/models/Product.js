const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    eventDate: { type: Date },
    active: { type: Boolean, default: true},
    userId: { type: String, required: true},
},


{ timestamps: true } // add createdAt and updatedAt
)

module.exports = mongoose.model("Product", ProductSchema); //we can use this model inside our router