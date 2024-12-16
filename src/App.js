import { BrowserRouter,Route, Routes} from "react-router-dom";
// import { useDispatch } from "react-redux";
import './App.css';
import HomesPages from "./pages/HomesPages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Creatlisting from "./pages/Creatlisting";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomesPages/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/create-listing" element={<Creatlisting/>}/>
      <Route path="/properties/:listingId" element={<ListingDetails/>}/>
      <Route path="/properties/category/:category" element={<CategoryPage/>}/>
      <Route path="/properties/search/:search" element={<SearchPage/>}/>
      <Route path="/:userId/trips" element={<TripList/>}/>
      <Route path="/:userId/wishList" element={<WishList/>}/>
      <Route path="/:userId/properties" element={<PropertyList/>}/>
      <Route path="/:userId/reservations" element={<ReservationList/>}/>
      <Route path="/:userId/payment" element={<PaymentPage/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
