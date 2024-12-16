import Navbar  from "../components/Navbar";
import React from 'react';
import Slide from "../components/Slide";
import Category from "../components/Categories";
import Listings from "../components/Listings"
import Footer from "../components/Footer";
const HomesPages = () => {
  return (
    <>
    <Navbar></Navbar>
    <Slide></Slide>
    <Category></Category>
    <Listings></Listings>
    <Footer/>
    </>
  )
}

export default HomesPages