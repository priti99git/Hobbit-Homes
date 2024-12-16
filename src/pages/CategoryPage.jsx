import React, { useState,useEffect } from 'react'
import "../styles/list.scss"
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { setListings } from '../redux/state';
import Loader from '../components/Loader';
import ListingCard from '../components/ListingCard';
import Footer from "../components/Footer";

const CategoryPage = () => {
    const [loading,setLoading]=useState(true);
    const {category}=useParams()
    const dispatch=useDispatch()
    const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
       
           `http://localhost:3001/properties?category=${category}`
        ,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading? <Loader/> : (
    <>
    <Navbar/>
    <h1 className="title-list">{category} Listings</h1>
      <div className="list">
        {listings.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            country,
            province,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard 
            listingId={_id}
            creator={creator}
            listingPhotoPaths={listingPhotoPaths}
            city={city}
            country={country}
            province={province}
            category={category}
            type={type}
            price={price}
            booking={booking}            
            />
          )
        )}
      </div>
    <Footer/>
    </>
  )
}

export default CategoryPage