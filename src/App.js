import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Setting from "./pages/Setting";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import { AuthContext } from "./context/AuthContext";
import AddCity from "./pages/AddCity";
import SinglePost from "./pages/SinglePost";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            }
          />
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={currentUser ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addcity" element={<AddCity />} />
          <Route path="/post/:postId" element={<SinglePost />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
