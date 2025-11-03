import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: { amount: number; currency: string };
  images: string[];
  user_id: string;
  createdAt: string;
}

interface User {
  _id: string;
  fullname: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"users" | "products">("users");

  useEffect(() => {
    if (user?.isAdmin) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [usersRes, productsRes] = await Promise.all([
        axiosInstance.get("/api/users/all"),
        axiosInstance.get("/api/products/all"),
      ]);
      setUsers(usersRes.data.users || []);
      setProducts(productsRes.data.products || []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        ❌ You are not authorized to view this page.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Manage Users
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "products"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Manage Products
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">All Users</h2>
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{u.fullname}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">
                      {u.isAdmin ? "✅" : "❌"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            All Products
          </h2>
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Seller ID</th>
                <th className="px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">
                      {p.price.amount} {p.price.currency}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {p.user_id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
