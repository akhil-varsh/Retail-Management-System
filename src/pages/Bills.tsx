import React from 'react';
import { Download, FileText, Filter } from 'lucide-react';

interface Bill {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

function Bills() {
  // Mock data - replace with Supabase data
  const bills: Bill[] = [
    {
      id: '1',
      orderNumber: 'ORD001',
      customer: 'John Doe',
      date: '2024-03-15',
      amount: 1299.99,
      status: 'paid',
      dueDate: '2024-03-30'
    },
    {
      id: '2',
      orderNumber: 'ORD002',
      customer: 'Jane Smith',
      date: '2024-03-14',
      amount: 499.99,
      status: 'pending',
      dueDate: '2024-03-29'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Bills</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="all">All Bills</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
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
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bill #</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bills.map((bill) => (
                    <tr key={bill.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-gray-400" />
                          BILL-{bill.id}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bill.orderNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bill.customer}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bill.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bill.dueDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${bill.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          bill.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : bill.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </button>
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

export default Bills;