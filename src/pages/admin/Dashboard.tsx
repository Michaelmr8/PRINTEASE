import { mockOrders, mockCustomers } from '../../data/mockData';
import { Package, TrendingUp, CheckCircle, Users, MoreVertical, Search, Filter } from 'lucide-react';

export default function AdminDashboard() {
  const activeOrders = mockOrders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening in your shop today.</p>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
          Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-lg"><Package size={24} /></div>
            <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+12%</span>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Today's Orders</h3>
            <div className="text-3xl font-bold text-gray-900">24</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg"><TrendingUp size={24} /></div>
            <span className="text-sm font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">--</span>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">In Production</h3>
            <div className="text-3xl font-bold text-gray-900">8</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-50 text-green-600 p-3 rounded-lg"><CheckCircle size={24} /></div>
            <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">-2%</span>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Ready for Pickup</h3>
            <div className="text-3xl font-bold text-gray-900">5</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-lg"><Users size={24} /></div>
            <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+18%</span>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Today's Revenue</h3>
            <div className="text-3xl font-bold text-gray-900">Rp 2.45M</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-900">Recent Orders</h2>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Search size={18} /></button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Filter size={18} /></button>
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeOrders.map(order => {
                  const customer = mockCustomers.find(c => c.id === order.customerId);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 text-gray-600">{customer?.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Printing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Ready' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">Rp {order.total.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-900"><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Production Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <h2 className="font-bold text-lg text-gray-900 mb-6">Production Queue Overview</h2>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="font-medium text-gray-700">In Queue</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">12</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="font-medium text-gray-700">Printing</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">8</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="font-medium text-gray-700">Quality Check</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">3</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium text-gray-700">Ready</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">5</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 rounded-lg transition-colors">
            View Full Board
          </button>
        </div>
      </div>
    </div>
  );
}
