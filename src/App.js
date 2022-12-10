import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Setting from "./pages/Setting";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Footer from "./components/Footer.tsx";
import { AuthContext } from "./context/AuthContext";
import AddCity from "./pages/AddCity";
import SinglePost from "./pages/SinglePost";
import Faq from "./pages/Faq";

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
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={currentUser ? <Home /> : <Login />} />
          <Route
            path="/register"
            element={currentUser ? <Home /> : <Register />}
          />
          <Route
            path="/addcity"
            element={
              <ProtectedRoute>
                <AddCity />
              </ProtectedRoute>
            }
          />
          <Route path="/post/:postId" element={<SinglePost />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
