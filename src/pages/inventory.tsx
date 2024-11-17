import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
  supplier: string;
}

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with Supabase data
  const products: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro X1',
      sku: 'LAP001',
      quantity: 25,
      price: 999.99,
      category: 'Electronics',
      supplier: 'Tech Solutions Inc'
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      sku: 'MOU001',
      quantity: 50,
      price: 29.99,
      category: 'Accessories',
      supplier: 'Tech Solutions Inc'
    }
  ];

  const categories = ['all', 'Electronics', 'Accessories', 'Peripherals'];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SKU</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Supplier</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{product.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.sku}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.quantity}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${product.price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.supplier}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
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
  );
}

export default Inventory;