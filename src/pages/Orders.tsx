import React from 'react';
import { Plus, Filter } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: number;
}

function Orders() {
  // Mock data - replace with Supabase data
  const orders: Order[] = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      date: '2024-03-15',
      total: 1299.99,
      status: 'pending',
      items: 3
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      date: '2024-03-14',
      total: 499.99,
      status: 'completed',
      items: 2
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-end">
          <select className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order ID</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.customer}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.items}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${order.total}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;