const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { json } = require("body-parser");

const authRoutes=require("./routes/auth.js");
const listingRoutes=require("./routes/listing.js");
const bookingRoutes=require("./routes/booking.js")
const userRoutes=require("./routes/user.js")

app.use(cors())
app.use(express.json())
app.use(express.static('public'))


// routes
app.use("/auth",authRoutes)
app.use("/properties",listingRoutes)
app.use("/bookings",bookingRoutes)
app.use("/users",userRoutes)

// mongo connect
const PORT=3001;
mongoose.connect(process.env.mg,
    {
         dbName:"Hobbit_homes",
         useNewUrlParser:true,
         useUnifiedTopology:true
    })
    .then ( () => {
        app.listen(PORT, ()=> console.log(`server PORT : ${PORT} connected`));
    })
    .catch((err) => console.log(`${err},not connected!`));
