const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const eventRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
var cors = require('cors')

app.use(cors())

const multer = require("multer");

dotenv.config();

mongoose
.connect(process.env.MONGO_URL) //secret key
    .then(() => console.log("DbConnection succesfull"))
    .catch((err) => {
        console.log(err);
    })

    const storage = multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, "images")
        }, filename: (req, file, cb) => {
            cb(null, "hello.jpeg");
        }
    })

    const upload = multer({storage: storage});
    app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    })

app.use(express.json()); //app can take json objects
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/events", eventRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT || 5000, ()=> {
    console.log("server is running");
})

