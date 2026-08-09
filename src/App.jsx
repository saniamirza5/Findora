import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ItemDetails from "./pages/ItemDetails";
import ReportItem from "./pages/ReportItem";
import MyItems from "./pages/MyItems";
import Conversations from "./pages/Conversations";
import Chat from "./pages/Chat";

function AppLayout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Application */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/my-items" element={<MyItems />} />

        {/* Messaging */}
        <Route
          path="/conversations"
          element={<Conversations />}
        />

        <Route
          path="/chat/:conversationId"
          element={<Chat />}
        />

        {/* Temporary */}
        <Route
          path="/profile"
          element={<h1>Profile</h1>}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;