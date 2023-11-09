import "./App.css";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/users/Home";
import { CarList } from "./pages/users/CarList";
import { CarDetail } from "./pages/users/CarDetail";
import { CarCheckout } from "./pages/users/CarCheckout";
import { Tracking } from "./pages/users/Tracking";
import Footer from "./components/Footer";
import ContentContainer from "./components/ContentContainer";
import Login from "./pages/users/Login";
import UserRegister from "./pages/register/userRegister";
import BackOfficeRegister from "./pages/register/BackOfficeRegister";
import { CarRentalList } from "./pages/car_rental/CarRentalList";
import { Dashboard } from "./pages/car_rental/Dashboard";
import { AddCar } from "./pages/car_rental/AddCar";
import { EditCar } from "./pages/car_rental/EditCar";
import LoginOwner from "./pages/car_rental/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import EventList from "./pages/users/EventList";
import TrackingBook from "./pages/car_rental/TrackingBook";
import { History } from "./pages/car_rental/History";
import { BookHistory } from "./pages/users/BookingHistory";
import { TrackingHistory } from "./pages/users/TrackingHistory";
import RouteList from "./pages/users/RouteList";
import UserEdit from "./pages/edit_Profile/UserEdit";
import MerChantUserEdit from "./pages/edit_Profile/Merchant";
import RouteDetail from "./pages/users/RouteDetail";
import EventDetail from "./pages/users/EventDetail";
import AddRouteForm from "./pages/users/AddRouteForm";

function App() {
  return (
    <>
      <Navbar />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-list/*" element={<CarList />} />
          <Route path="/motorhome/:id/*" element={<CarDetail />} />
          <Route path="/motorhome/:id/checkout/*" element={<CarCheckout />} />
          <Route path="/tracking/user/:bookingId" element={<Tracking />} />
          <Route path="/addroute" element={<AddRouteForm />} />

          <Route path="/history/:bookingId" element={<TrackingHistory />} />
          <Route path="/history" element={<BookHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/event" element={<EventList />} />
          <Route path="/route" element={<RouteList />} />
          <Route path="/route/:id" element={<RouteDetail />} />

          <Route path="/merchant/" element={<LoginOwner />} />
          <Route path="/merchant/register" element={<BackOfficeRegister />} />
          <Route
            path="/merchant/mycar"
            element={
              <ProtectedRoute role={"carRentalOwner"}>
                <CarRentalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/dashboard"
            element={
              <ProtectedRoute role={"carRentalOwner"}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/addcar"
            element={
              <ProtectedRoute role={"carRentalOwner"}>
                <AddCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/editcar/:id"
            element={
              <ProtectedRoute role={"carRentalOwner"}>
                <EditCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/tracking/:bookingId"
            element={
              <ProtectedRoute role={"carRentalOwner"}>
                <TrackingBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/history"
            element={
              <ProtectedRoute role={"carRentalOwner"}>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/merchant/editprofile/:id"
            element={
              <ProtectedRoute role={"carRentalOwner"}>
                <MerChantUserEdit />
              </ProtectedRoute>
            }
          />
          <Route path="event/:id" element={<EventDetail/>} />
          <Route path="editprofile/:id" element={<UserEdit/>}/>
          <Route path="event" element={<EventList/>}/>
        </Routes>
      </ContentContainer>
      <Footer />
    </>
  );
}

export default App;
