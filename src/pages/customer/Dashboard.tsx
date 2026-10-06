import { mockOrders } from '../../data/mockData';
import { Package, Clock, ChevronRight, FileText, Settings, HelpCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const activeOrder = mockOrders[0]; // Printing
  const pastOrder = mockOrders[1]; // Ready

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
            <p className="text-gray-600">Here's what's happening with your print orders.</p>
          </div>
          <Link to="/order" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm inline-flex items-center gap-2 w-fit">
            <Package size={18} /> New Print Order
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Order Card */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div> Active Order
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-start">
                  <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Order #{activeOrder.id}</h3>
                    <p className="text-sm text-gray-500 mb-2">Marketing_Proposal.pdf • 50 Copies</p>
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold">
                      <Clock size={12} /> {activeOrder.status}
                    </div>
                  </div>
                </div>
                <div className="text-right w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end">
                  <div className="text-sm text-gray-500 mb-1">Est. Completion</div>
                  <div className="font-bold text-gray-900">{activeOrder.estimatedCompletion}</div>
                  <Link to="/track" className="mt-2 text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center gap-1">
                    Track <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {[activeOrder, pastOrder].map((order) => (
                    <div key={order.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900">#{order.id}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-600">Rp {order.total.toLocaleString('id-ID')}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                          order.status === 'Ready' || order.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                        <ChevronRight className="text-gray-400" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All History</button>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="text-gray-400" size={20} />
                  <span className="font-medium">Notifications</span>
                  <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">2</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="text-gray-400" size={20} />
                  <span className="font-medium">Account Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <HelpCircle className="text-gray-400" size={20} />
                  <span className="font-medium">Help & Support</span>
                </button>
              </div>
            </div>

            {/* Support Widget */}
            <div className="bg-indigo-600 rounded-2xl shadow-sm p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Need help?</h3>
              <p className="text-indigo-100 text-sm mb-4">Our support team is ready to assist you with your orders.</p>
              <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg text-sm hover:bg-indigo-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
