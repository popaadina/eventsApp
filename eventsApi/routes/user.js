const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    //the token belongs to clients or admin
    //egal cu id-ul venit ca parametru
    //verificam daca este admin
    if(req.user.id === req.params.id || req.user.isAdmin) {
        

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body //takes everything inside the body and set it again
                },
                {new: true} //prevent returning updated user
            )
            res.status(200).json(updatedUser);

        } catch (err) { 
            res.status(500).json(err);
        }
    }
    
})

router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=> {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...");
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/find/:id", verifyTokenAndAdmin, async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch(err) {
        res.status(500).json(err);
    }
})


//Return all users
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    const query = req.query.new;
    try{
        const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
})

//Total number of users per month
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear }}},
            {
                $project: {
                    month: { $month: "$createdAt" },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;