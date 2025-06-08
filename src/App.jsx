import { Route, Routes } from "react-router-dom";
import "./App.css";
import CenterLayout from "./assets/layouts/CenterLayout";
import PortalLayout from "./assets/layouts/PortalLayout";
import EventsPage from "./assets/Pages/EventsPage";
import Dashboard from "./assets/Pages/Dashboard";
import EventDetails from "./assets/Pages/EventDetails";
import BookingsPage from "./assets/Pages/BookingsPage";
import SignInPage from "./assets/Pages/SignInPage";
import SignUpPage from "./assets/Pages/SignUpPage";
import EmailVerificationPage from "./assets/Pages/EmailVerificationPage";
import PrivateRoute from "./assets/Components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<CenterLayout />}>
        <Route />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/verify" element={<EmailVerificationPage />}></Route>
      </Route>
      <Route element={<PortalLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <BookingsPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
