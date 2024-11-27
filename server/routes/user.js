const router=require("express").Router()

const Booking=require("../models/Booking")
const User =require("../models/User")
const Listing=require("../models/Listing")
// get trip list 

router.get("/:userId/trips",async (req,res)=>{
    try{
        const {userId}=req.params
        const trips=await Booking.find({customerId: userId}).populate("customerId hostId listingId")
        res.status(202).json(trips)

        
    }catch(err){
        console.log(err)
        res.status(404).json({message:"can not find trips!",error:err.message })

    }
})


// wish list add listing to wish

router.patch("/:userId/:listingId", async (req,res)=>{
    try{
        const {userId,listingId}=req.params
        const user=await User.findById(userId)
        const listing=await Listing.findById(listingId).populate("creator")

        const favoriteListing=user.wishList.find((item)=>item._id.toString() ===listingId)
        
        if (favoriteListing){
            user.wishList=user.wishList.filter((item)=>item._id.toString() !==listingId)
            await user.save()
            res.status(200).json({message:"Listing is removed from wish list",wishList:user.wishList})
        } else {
            
            user.wishList.push(listing)
            await user.save()
            res.status(200).json({message:"Listing is added to wish list",wishList:user.wishList})
        } 
    
    
    }catch(err){
        console.log(err)
        res.status(400).json({error:err.message})
    }
})

// property list

router.get("/:userId/properties",async (req,res)=>{
    try{
        const {userId}=req.params
        const properties =await Listing.find({creator: userId}).populate("creator")
        res.status(202).json(properties)

    }catch(err){

        res.status(404).json({message:"can not find properties!",error:err.message})

    }
})

// reservation list

router.get("/:userId/reservations",async (req,res)=>{
    try{
        const {userId}=req.params
        const reservations=await Booking.find({hostId: userId}).populate("customerId hostId listingId").exec()
        res.status(202).json(reservations)
        // console.log(reservations)

    }catch(err){
        console.log(err)
        res.status(404).json({message:"can not find reservation!",error:err.message})

    }
})

// payment Page

router.get("/:userId/payment",async (req,res)=>{
    try{
        const {userId}=req.params
        const payment = await Booking.find({customerId :userId}).populate("customerId hostId listingId")
        res.status(202).json(payment)

    }catch(err){
        console.log(err)
        res.status(404).json({message:"can not payment!",error:err.message})

    }
})







module.exports = router