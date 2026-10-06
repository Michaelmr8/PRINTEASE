import { useState } from 'react';
import { mockOrders, mockCustomers } from '../../data/mockData';
import { Search, Filter, ChevronDown, Download, Eye, FileText, X } from 'lucide-react';
import type { Order, OrderStatus } from '../../types';

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case 'Pending Payment': return 'bg-gray-100 text-gray-700';
      case 'Payment Confirmed': return 'bg-blue-100 text-blue-700';
      case 'Order Received': return 'bg-purple-100 text-purple-700';
      case 'In Queue': return 'bg-yellow-100 text-yellow-700';
      case 'Printing': return 'bg-indigo-100 text-indigo-700';
      case 'Quality Check': return 'bg-pink-100 text-pink-700';
      case 'Ready': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-teal-100 text-teal-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all customer orders.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockOrders.map(order => {
                const customer = mockCustomers.find(c => c.id === order.customerId);
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="font-medium text-gray-900">{customer?.name}</div>
                      <div className="text-xs">{customer?.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">Rp {order.total.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium px-3 py-1.5 rounded bg-indigo-50 hover:bg-indigo-100 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 animate-in fade-in">
          <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Order #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Status Update */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Update Status</h3>
                <div className="flex items-center gap-3">
                  <select className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border" defaultValue={selectedOrder.status}>
                    <option>Pending Payment</option>
                    <option>Payment Confirmed</option>
                    <option>In Queue</option>
                    <option>Printing</option>
                    <option>Quality Check</option>
                    <option>Ready</option>
                    <option>Completed</option>
                  </select>
                  <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Update
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="font-bold text-gray-900 text-lg mb-2">{mockCustomers.find(c => c.id === selectedOrder.customerId)?.name}</div>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <p>{mockCustomers.find(c => c.id === selectedOrder.customerId)?.email}</p>
                    <p>{mockCustomers.find(c => c.id === selectedOrder.customerId)?.phone}</p>
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Uploaded File</h3>
                <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg"><FileText size={24} /></div>
                    <div>
                      <div className="font-bold text-gray-900">Marketing_Proposal.pdf</div>
                      <div className="text-xs text-gray-500">2.5 MB</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Eye size={20} /></button>
                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Download size={20} /></button>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Printing Specifications</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <span className="block text-gray-500 mb-1">Paper Size</span>
                    <span className="font-bold text-gray-900">{selectedOrder.specifications.paperSize}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Paper Type</span>
                    <span className="font-bold text-gray-900">{selectedOrder.specifications.paperType}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Color Options</span>
                    <span className="font-bold text-gray-900">{selectedOrder.specifications.color ? 'Full Color' : 'Black & White'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Sides</span>
                    <span className="font-bold text-gray-900">{selectedOrder.specifications.doubleSided ? 'Double Sided' : 'Single Sided'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Quantity</span>
                    <span className="font-bold text-gray-900">{selectedOrder.specifications.quantity} Copies</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
