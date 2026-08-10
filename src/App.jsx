import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";
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

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Main Application */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/items/:id"
          element={
            <ProtectedRoute>
              <ItemDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/items/:id/edit"
          element={
            <ProtectedRoute>
              <EditItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-items"
          element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          }
        />

        {/* Messaging */}

        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <Conversations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:conversationId"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* Temporary */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;