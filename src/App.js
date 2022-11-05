import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import NavBar from "./Components/Navbar/Navbar";
import Campgrounds from "./Pages/Campground/Campground";
import AddCampGroundPage from "./Pages/AddCampGround/AddCampGroundPage";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/ProfilePage/Profile";
import Wishlist from "./Pages/Wishlist/Wishlist";
// import <Contact from "./Pages/Contact/Signup"
function App() {
  return (
    <div className="App">
      {/* <NavBar/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Campgrounds" element={<Campgrounds />} />
        <Route path="/AddCampgrounds" element={<AddCampGroundPage />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
