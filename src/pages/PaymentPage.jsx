import React, { useEffect, useState } from "react";
import "../styles/list.scss";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import state, { setPaymentPage } from "../redux/state";
import "../styles/payment.scss";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {loadStripe} from "@stripe/react-stripe-js"


const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  // const listingId = useSelector((state) => state.listingId._id);

  const paymentPage = useSelector((state) => state.user.paymentPage) || [];
  
//   const customerId=useSelector((state)=>state.user._id)

// const navigate=useNavigate();



const [showCardForm, setShowCardForm] = useState(false);

  const dispatch = useDispatch();
  const getPaymentPage = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/payment`,
        {
          method: "GET",
           headers:{
            "Content-Type":"application/json",
          },
        }
      );
      // if (response.ok){
      //   navigate(`/${customerId}/trips`)
      // }

      const data = await response.json();
      dispatch(setPaymentPage(data));
      setLoading(false);
    } catch (err) {
      console.log("failed to payment", err.message);
    }
  };
  useEffect(() => {
    getPaymentPage();
  }, []);
  console.log("Payent page:",paymentPage);
  console.log(typeof(paymentPage));


  // const latestListing = paymentPage.length > 0 ? paymentPage[0] : null;


  
  // Sort the paymentPage array based on createdAt in descending order
  // const sortedPaymentPage = (paymentPage || []).slice().sort((a, b) => {
  //   return new Date(b.createdAt) - new Date(a.createdAt);
  // });

  const sortedPaymentPage = Object.values(paymentPage)
  .slice()
  .sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });


  // Extract the latest listing from sortedPaymentPage
  const latestListing = sortedPaymentPage.length > 0 ? sortedPaymentPage[0] : null;
  console.log("latestListing:",latestListing);



  // const totalPayment = paymentPage.reduce((total, item) =>{
//     if(item.id ===userId.listingId){

//   return  total+item.totalPrice;
// }else{
// return total
//   }
// }, 0)


  // const makepayment=async()=>{
  //   const stripe=auth
  // }

  return loading ? (
    <Loader />
  ) : (
    <>
     <Navbar />
    <div className="payment-page-container">
      {/* <Navbar /> */}
      <div className="payment-content">
     
      <h1 className="title-list"> Payment </h1>
      <div className="list">

      {latestListing && (
              <ListingCard
                listingId={latestListing.listingId?._id}
                creator={latestListing.hostId?._id}
                listingPhotoPaths={latestListing.listingId.listingPhotoPaths}
                city={latestListing.listingId.city}
                province={latestListing.listingId.province}
                country={latestListing.listingId.country}
                category={latestListing.listingId.category}
                startDate={latestListing.listingId.startDate}
                endDate={latestListing.listingId.endDate}
                totalPrice={latestListing.listingId.totalPrice}
                booking={latestListing.listingId.booking}
              />
            )}
          </div>
          <div className="total-payment">
            
            Your total payment: Rs {latestListing ? latestListing.totalPrice : 0}
            {/* <p>Choose your payment method:</p> */}

{/* 
{ Array.isArray(paymentPage) &&paymentPage?.map(
          ({
            listingId,
            hostId,
            star        tDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              listingId={listingId?._id}
              creator={hostId?._id}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          )
        )}
      </div>
      {/* <div className="payment">your total payment : total price  </div> 
      
      <div className="total-payment">Your total payment: Rs {totalPayment} */}








        <p>Choose your payment method:</p>
        <form >
        <br></br>
        <label>
        
          <input type="radio" name="paymentMethod" value="cash" onChange={() => setShowCardForm(false)}/> Cash on Arrival Day
          <div></div>
        </label>
        <br></br>
        <label>
          <input type="radio" name="paymentMethod" value="card" onChange={() => setShowCardForm(true)} /> Card Payment

       
        {/* <input type="text" name="paymentMethod" ></input> */}
        <br></br>
        {showCardForm && (
        <div class="col-50">
            {/* <h3>Payment</h3> */}
            {/* <label for="fname">Accepted Cards</label> */}
            <br></br>
            {/* <div class="icon-container">
              <i class="fa fa-cc-visa" style="color:navy;"></i>
              <i class="fa fa-cc-amex" style="color:blue;"></i>
              <i class="fa fa-cc-mastercard" style="color:red;"></i>
              <i class="fa fa-cc-discover" style="color:orange;"></i>
            </div> */}
            <label for="cname">Name on Card</label>
            <input type="text" id="cname" name="cardname" placeholder="John More Doe" required ></input>
            <label for="ccnum">Credit card number</label>
            <input type="number" id="ccnum" name="cardnumber"placeholder="1111-2222-3333-4444"required></input>
            <label for="expmonth">Exp Month</label>
            <input type="text" id="expmonth" name="expmonth" placeholder="September"required></input>

            <div class="row">
              <div class="col-50">
                <label for="expyear">Exp Year</label>
                <input type="number" id="expyear" name="expyear" placeholder="2018" required></input>
              </div>
              <div class="col-50">
                <label for="cvv">CVV</label>
                <input type="password" id="cvv" name="cvv" placeholder="352"required></input>
              </div>
            </div>
          </div>
        )}
          {/* <button type="submit"  >Submit Card Details </button> */}
          {/* <button type="submit" classname="pay-now-button" required onClick={() => alert("Card details submitted successfully!")}>
  Submit Card Details
</button> */}


          </label>
          </form>
       
        <br></br>
      </div>
      <div className="payment-button">
        <button className="submit_btn"  type="submit"  onClick={() => alert("Payment done successfully!")}required>Payment </button>
        <br></br>
        {/* <button className="submit_btn" type="submit">Cancel Booking</button> */}
      </div>
      </div>

      </div>
      <Footer />
    </>

  );
};

export default PaymentPage;
