const router = require("express").Router()
const multer = require("multer");
const User = require("../models/User");
const Listing = require("../models/Listing");


// configuration multer for file upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");  //store uploaded files in the 'uploads ' floder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //use th eoriginal file name
    },
});

const upload = multer({ storage })

// create listing

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        // take the info from the form
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            country,
            province,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDescription,
            price,
        } = req.body

        const listingPhotos = req.files
        if (!listingPhotos) {
            return res.status(400).send("no file uploaded")
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path)

        const newListing = new Listing({

            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            country,
            province,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDescription,
            price,
        })
        await newListing.save()
        res.status(200).json(newListing)

    } catch (err) {
        res.status(400).json({ message: "fail to create Listing", error: err.message })
        console.log(err)
    }
});

// get Listing by category

router.get("/", async (req, res) => {
    const qCategory = req.query.category
    try {
        let listings
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator")
        } else {
            listings = await Listing.find().populate("creator")
        }
        res.status(200).json(listings)
    } catch (err) {
        res.status(400).json({ message: "fail to fetch Listing", error: err.message })
        console.log(err)
    }
});

// get listing by search
router.get("/search/:search",async (req,res)=>{
    const {search} =req.params

    try{
        let listings=[]
        if (search ==="all"){
            listings=await Listing.find().populate("creator")
        }else{
            listings=await Listing.find({
                $or:[
                    { category: {$regex:search,$options:"i"}},
                    {title: {$regex:search,$options:"i"}},
                    {city:{$regex:search,$options:"i"}},
                    {province: {$regex:search,$options:"i"}},
                    {type:{$regex:search,$options:"i"}},
                ]
            }).populate("creator")
        }
        res.status(200).json(listings)
    } catch(err) {
        res.status(404).json({message:"failed to search",error:err.message})
        console.log(err)
    }

})


// listing details

router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params
        const listing = await Listing.findById(listingId).populate("creator")
        res.status(202).json(listing)
        console.log(listingId)

    } catch (err) {
        res.status(404).json({ message: "listing can not found!", error: err.message })
        console.log(err)

    }
});



module.exports = router