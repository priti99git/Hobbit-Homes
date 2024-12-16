import React, { useEffect, useState } from "react";
import "../styles/list.scss";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";

import { setReservationList } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);

  const reservationList = useSelector((state) => state.user?.reservationList);

  const dispatch = useDispatch();
  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );
      if (!response.ok){
        throw new Error("failed to fetch reservation list")
      }
      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("failed to fetch Reservation list", err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getReservationList();
  }, [dispatch,userId]);

// console.log(reservationList)

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.map(
          ({listingId, hostId,startDate, endDate, totalPrice, booking = true }) => (

            <ListingCard
            key={listingId._id}
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
      <Footer/>
    </>
  );
};

export default ReservationList;
