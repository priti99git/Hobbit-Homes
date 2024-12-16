import React, { useEffect, useState } from "react";
import "../styles/listingDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";



const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("fetch listing details failded", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  //   booking calender

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    },
  ]);

  const handleSelect = (ranges) => {
    // updatede selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); //caculate the diffrence


  // sumit booking

  const customerId=useSelector((state)=>state?.user?._id)
  const navigate=useNavigate() 
  const handleSubmit=async()=>{
    try{
      const bookingForm={
        customerId,
        listingId,
        hostId:listing.creator._id,
        startDate:dateRange[0].startDate.toDateString(),
        endDate:dateRange[0].endDate.toDateString(), 
        totalPrice:listing.price *dayCount,
      }
      const response= await fetch("http://localhost:3001/bookings/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(bookingForm)
      })
      if (response.ok){
        // navigate(`/${customerId}/trips`)
        navigate(`/${customerId}/payment`)

      }
    }catch(err){
      console.log("Submit booking failed",err.message)
    }
  }
  //  console.log(listing.creator._id)
  return loading ? (
    <Loader />
  ) : (
    <>
    <Navbar/>
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>
        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing photos"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province}, {""}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guest -{listing.bedroomCount}bedroom(s)-{""}
          {listing.bedCount} bed(s) -{listing.bathroomCount} bathroom(s)
        </p>

        <hr></hr>
        <div className="profile">
          
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public","")}`}
            alt="profile image"
          ></img>

          <h3>
            Hosted by {listingId.creatorId} {listing.creator.firstName} {listing.creator.lastName} 
          </h3>
        </div>
       

        <hr/>

        <h2>Description</h2>
        <p>{listing.description}</p>
        <hr />

        <h2>{listing.highlight}</h2>
        <p>{listing.highlightDescription}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>

                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="data-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  Rs {listing.price} X {dayCount} nights
                </h2>
              ) : (
                <h2>
                  Rs {listing.price} X {dayCount} night
                </h2>
              )}
              <h4>There will be 3% tax on every booking as a part of service charge</h4>
              <h2>Total Price: Rs {listing.price * dayCount }</h2>
              <p>Start Date :{dateRange[0].startDate.toDateString()}</p>
              <p>End Date :{dateRange[0].endDate.toDateString()}</p>


              <button className="submit_btn" type="submit" onClick={handleSubmit} >BOOKING</button>

            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
   
  );
};

export default ListingDetails;
