const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true } // add createdAt and updatedAt
)

module.exports = mongoose.model("User", UserSchema); //we can use this model inside our router