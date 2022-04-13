const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
},


{ timestamps: true } // add createdAt and updatedAt
)

module.exports = mongoose.model("Category", CategorySchema); //we can use this model inside our router