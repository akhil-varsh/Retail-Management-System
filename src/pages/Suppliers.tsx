import React from 'react';
import { Plus, Mail, Phone, MapPin } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  lastDelivery: string;
  status: 'active' | 'inactive';
}

function Suppliers() {
  // Mock data - replace with Supabase data
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Tech Solutions Inc',
      email: 'sales@techsolutions.com',
      phone: '(555) 234-5678',
      address: '123 Tech Park, Silicon Valley, CA',
      products: ['Laptops', 'Accessories'],
      lastDelivery: '2024-03-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'Global Electronics Ltd',
      email: 'orders@globalelec.com',
      phone: '(555) 876-5432',
      address: '456 Industry Ave, New York, NY',
      products: ['Smartphones', 'Tablets'],
      lastDelivery: '2024-03-12',
      status: 'active'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Suppliers</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {supplier.name}
                </h3>
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    supplier.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                </span>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {supplier.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {supplier.phone}
                </div>
                <div className="flex items-start text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  {supplier.address}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Products</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {supplier.products.map((product) => (
                    <span
                      key={product}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last Delivery: {supplier.lastDelivery}
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-900">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suppliers;