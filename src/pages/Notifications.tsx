import React from 'react';
import { 
  AlertTriangle, 
  PackageCheck, 
  ShoppingCart, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  message: string;
  timestamp: string;
  read: boolean;
}

function Notifications() {
  // Mock data - replace with Supabase data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      message: 'Low stock alert: Laptop Pro X1 (5 units remaining)',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'success',
      message: 'New order #ORD001 has been successfully processed',
      timestamp: '3 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      message: 'Supplier delivery scheduled for tomorrow',
      timestamp: '5 hours ago',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'alert':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`py-5 ${notification.read ? 'opacity-75' : ''}`}
            >
              <div className="relative focus-within:ring-2 focus-within:ring-blue-500">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.timestamp}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 text-sm font-medium"
                    >
                      {notification.read ? 'Mark unread' : 'Mark read'}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
          <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}

export default Notifications;