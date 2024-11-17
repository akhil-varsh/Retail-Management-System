import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

function Dashboard() {
  const stats = [
    { name: 'Total Products', value: '248', icon: Package, change: '+4.75%' },
    { name: 'Active Orders', value: '12', icon: ShoppingCart, change: '+1.16%' },
    { name: 'Total Workers', value: '16', icon: Users, change: '0%' },
    { name: 'Low Stock Items', value: '5', icon: AlertTriangle, change: '-2.45%' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.change.startsWith('+')
                      ? 'text-green-600'
                      : item.change.startsWith('-')
                      ? 'text-red-600'
                      : 'text-gray-500'
                  }`}
                >
                  <TrendingUp
                    className={`self-center flex-shrink-0 h-4 w-4 ${
                      item.change.startsWith('+')
                        ? 'text-green-500'
                        : item.change.startsWith('-')
                        ? 'text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <span className="sr-only">
                    {item.change.startsWith('+')
                      ? 'Increased by'
                      : item.change.startsWith('-')
                      ? 'Decreased by'
                      : 'Changed by'}
                  </span>
                  {item.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 bg-white shadow rounded-lg">
          {/* Activity list will be implemented here */}
          <div className="p-6 text-center text-gray-500">
            Activity feed coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;