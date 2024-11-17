import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const CitizenDashboard = () => {
  const [products, setProducts] = useState<any[]>([]); // List of all products
  const [orders, setOrders] = useState<any[]>([]); // Current orders
  const [orderHistory, setOrderHistory] = useState<any[]>([]); // Previous orders
  const [user, setUser] = useState<any>(null); // Current user

  useEffect(() => {
    // Get the current user (You can use Supabase session management here)
    const currentUser = supabase.auth.user();
    if (!currentUser) {
      toast.error('You need to be logged in to view the dashboard.');
      window.location.href = '/login'; // Redirect to login if user is not logged in
    }
    setUser(currentUser);
    fetchProducts();
    fetchUserOrders(currentUser?.id);
    fetchOrderHistory(currentUser?.id);
  }, []);

  // Fetch products from the database
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products.');
    }
  };

  // Fetch current orders for the logged-in user
  const fetchUserOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'pending'); // Assuming 'pending' orders are current
      if (error) throw error;
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch current orders.');
    }
  };

  // Fetch order history (previous orders) for the logged-in user
  const fetchOrderHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_history')
        .select('*')
        .eq('user_id', userId);
      if (error) throw error;
      setOrderHistory(data);
    } catch (error) {
      toast.error('Failed to fetch order history.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Citizen Dashboard
        </h2>

        {/* Display Available Products */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Products Available</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow-sm">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-4"
                />
                <h4 className="text-xl font-medium text-gray-800">{product.name}</h4>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-semibold text-blue-600">${product.price}</p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
                  onClick={() => alert(`Added ${product.name} to cart`)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display Current Orders */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Current Orders</h3>
          {orders.length === 0 ? (
            <p>You have no current orders.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border p-4 rounded-lg shadow-sm">
                  <h4 className="text-xl font-medium text-gray-800">Order ID: {order.id}</h4>
                  <p className="text-gray-600">Product ID: {order.product_id}</p>
                  <p className="font-semibold text-blue-600">Quantity: {order.quantity}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-500">Ordered on: {order.order_date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Display Previous Orders */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Previous Orders</h3>
          {orderHistory.length === 0 ? (
            <p>You have no previous orders.</p>
          ) : (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="border p-4 rounded-lg shadow-sm">
                  <h4 className="text-xl font-medium text-gray-800">Order ID: {order.id}</h4>
                  <p className="text-gray-600">Product ID: {order.product_id}</p>
                  <p className="font-semibold text-blue-600">Quantity: {order.quantity}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-500">Ordered on: {order.order_date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
