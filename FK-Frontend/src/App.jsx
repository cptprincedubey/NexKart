// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProducts";
import UpdateProduct from "./pages/UpdateProduct";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Navbar />
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <Navbar />
                <CreateProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-product/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <UpdateProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Navbar />
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <Navbar />
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<Login />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
