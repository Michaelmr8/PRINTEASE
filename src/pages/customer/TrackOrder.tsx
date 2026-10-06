import { mockOrders } from '../../data/mockData';
import { Package, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

const statuses = [
  'Pending Payment', 'Payment Confirmed', 'Order Received', 
  'In Queue', 'Printing', 'Quality Check', 'Ready', 'Completed'
];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);
  
  const order = mockOrders[0]; // Just showing the first one as a demo

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-600">Enter your Order ID to see the current status.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8 flex">
          <div className="pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-3 pr-3 py-3 border-0 focus:ring-0 text-gray-900 placeholder-gray-500 rounded-lg" 
            placeholder="e.g. PRN-1024" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button 
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            onClick={() => setSearched(true)}
          >
            Track
          </button>
        </div>

        {(searched || true) && ( // Mock showing order immediately for demo
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order #{order.id}</h2>
                <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                <Clock size={16} /> Est. Completion: {order.estimatedCompletion}
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 ml-[-1px]"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8 relative">
                  {statuses.map((status, index) => {
                    const isCompleted = index < currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    
                    if (index > currentStatusIndex + 1) return null; // Don't show too far into the future
                    
                    return (
                      <div key={status} className={`flex gap-6 ${isCurrent ? 'opacity-100' : isCompleted ? 'opacity-70' : 'opacity-40'}`}>
                        <div className="relative z-10 flex-shrink-0">
                          {isCompleted ? (
                            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                              <CheckCircle2 className="h-6 w-6 text-white" />
                            </div>
                          ) : isCurrent ? (
                            <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-md animate-pulse">
                              <Package className="h-5 w-5 text-white" />
                            </div>
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white">
                              <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="pt-2">
                          <h3 className={`font-bold text-lg ${isCurrent ? 'text-indigo-600' : 'text-gray-900'}`}>{status}</h3>
                          {isCurrent && (
                            <p className="text-gray-600 mt-1">
                              Your order is currently being printed. Quality check will follow shortly.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-100 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Order Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Service:</strong> Document Printing</p>
                  <p><strong>File:</strong> Marketing_Proposal.pdf</p>
                  <p><strong>Quantity:</strong> {order.specifications.quantity} copies</p>
                  <p><strong>Total:</strong> Rp {order.total.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Delivery Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><MapPin size={16} /> {order.deliveryMethod === 'Pickup' ? 'Pickup at Store' : 'Delivery to Address'}</p>
                  {order.deliveryMethod === 'Pickup' && <p>Jl. Margonda Raya No. 100, Depok</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
