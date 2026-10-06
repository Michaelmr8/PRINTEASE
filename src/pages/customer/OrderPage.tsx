import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle2, ChevronRight, MapPin, CreditCard, File } from 'lucide-react';
import { mockServices } from '../../data/mockData';

const steps = ['Service', 'Upload', 'Review', 'Delivery', 'Payment'];

export default function OrderPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const [orderData, setOrderData] = useState({
    serviceId: '',
    paperSize: 'A4',
    paperType: 'HVS 80gsm',
    color: true,
    doubleSided: false,
    quantity: 1,
    file: null as File | null,
    deliveryMethod: 'Pickup',
    address: '',
    paymentMethod: ''
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const calculateTotal = () => {
    let base = 500;
    if (orderData.color) base += 1000;
    if (orderData.doubleSided) base *= 1.5;
    
    let total = base * orderData.quantity;
    if (orderData.deliveryMethod === 'Delivery') total += 15000;
    return total;
  };

  const submitOrder = () => {
    // In a real app, send to API. Here we just navigate to track
    navigate('/track');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-600 -z-10 transition-all duration-300" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
            
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border-4 border-gray-50 ${index <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {index < currentStep ? <CheckCircle2 size={20} /> : index + 1}
                </div>
                <span className={`text-xs mt-2 font-medium ${index <= currentStep ? 'text-indigo-600' : 'text-gray-500'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {/* STEP 1: SERVICE */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Service & Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {mockServices.map(srv => (
                  <div 
                    key={srv.id} 
                    onClick={() => setOrderData({...orderData, serviceId: srv.id})}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${orderData.serviceId === srv.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                  >
                    <div className="font-bold text-gray-900">{srv.name}</div>
                    <div className="text-sm text-gray-500">{srv.description}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paper Size</label>
                  <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" value={orderData.paperSize} onChange={e => setOrderData({...orderData, paperSize: e.target.value})}>
                    <option>A4</option>
                    <option>A3</option>
                    <option>F4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paper Type</label>
                  <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" value={orderData.paperType} onChange={e => setOrderData({...orderData, paperType: e.target.value})}>
                    <option>HVS 80gsm</option>
                    <option>HVS 100gsm</option>
                    <option>Art Paper 150gsm</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="color" checked={!orderData.color} onChange={() => setOrderData({...orderData, color: false})} className="text-indigo-600" />
                    <span>Black & White</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="color" checked={orderData.color} onChange={() => setOrderData({...orderData, color: true})} className="text-indigo-600" />
                    <span>Color</span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sides" checked={!orderData.doubleSided} onChange={() => setOrderData({...orderData, doubleSided: false})} className="text-indigo-600" />
                    <span>Single Sided</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sides" checked={orderData.doubleSided} onChange={() => setOrderData({...orderData, doubleSided: true})} className="text-indigo-600" />
                    <span>Double Sided</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Copies/Pages)</label>
                  <input type="number" min="1" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" value={orderData.quantity} onChange={e => setOrderData({...orderData, quantity: parseInt(e.target.value) || 1})} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: UPLOAD */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your File</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900">Drag and drop your file here</p>
                <p className="text-sm text-gray-500 mb-6">Supports PDF, JPG, PNG, DOCX up to 50MB</p>
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50">
                  Browse Files
                </button>
              </div>

              {/* Mock uploaded file */}
              <div className="mt-6 bg-indigo-50 rounded-xl p-4 flex items-center justify-between border border-indigo-100">
                <div className="flex items-center gap-3">
                  <File className="text-indigo-600" />
                  <div>
                    <div className="font-medium text-gray-900">Document_Final.pdf</div>
                    <div className="text-xs text-gray-500">2.4 MB • Upload Complete</div>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Order</h2>
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-500">Service</div><div className="font-medium text-right">Document Printing</div>
                  <div className="text-gray-500">Paper</div><div className="font-medium text-right">{orderData.paperSize} - {orderData.paperType}</div>
                  <div className="text-gray-500">Color</div><div className="font-medium text-right">{orderData.color ? 'Color' : 'B&W'}</div>
                  <div className="text-gray-500">Sides</div><div className="font-medium text-right">{orderData.doubleSided ? 'Double Sided' : 'Single Sided'}</div>
                  <div className="text-gray-500">Quantity</div><div className="font-medium text-right">{orderData.quantity}</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DELIVERY */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div 
                  onClick={() => setOrderData({...orderData, deliveryMethod: 'Pickup'})}
                  className={`cursor-pointer rounded-xl p-6 border-2 flex flex-col items-center text-center transition-all ${orderData.deliveryMethod === 'Pickup' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                >
                  <MapPin size={32} className={`mb-3 ${orderData.deliveryMethod === 'Pickup' ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <div className="font-bold text-gray-900">Pickup at Store</div>
                  <div className="text-sm text-gray-500 mt-1">Free</div>
                </div>
                <div 
                  onClick={() => setOrderData({...orderData, deliveryMethod: 'Delivery'})}
                  className={`cursor-pointer rounded-xl p-6 border-2 flex flex-col items-center text-center transition-all ${orderData.deliveryMethod === 'Delivery' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                >
                  <Truck size={32} className={`mb-3 ${orderData.deliveryMethod === 'Delivery' ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <div className="font-bold text-gray-900">Delivery</div>
                  <div className="text-sm text-gray-500 mt-1">Rp 15.000</div>
                </div>
              </div>

              {orderData.deliveryMethod === 'Delivery' && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                    <textarea 
                      rows={3} 
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" 
                      placeholder="Enter your full address..."
                      value={orderData.address}
                      onChange={e => setOrderData({...orderData, address: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: PAYMENT */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>Rp {(calculateTotal() - (orderData.deliveryMethod === 'Delivery' ? 15000 : 0)).toLocaleString('id-ID')}</span></div>
                  {orderData.deliveryMethod === 'Delivery' && <div className="flex justify-between"><span className="text-gray-500">Delivery Fee</span><span>Rp 15.000</span></div>}
                  <div className="pt-2 border-t mt-2 flex justify-between font-bold text-lg"><span>Total</span><span className="text-indigo-600">Rp {calculateTotal().toLocaleString('id-ID')}</span></div>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-4">Select Payment Method</h3>
              <div className="space-y-3 mb-8">
                {['QRIS', 'GoPay', 'Bank Transfer (BCA)'].map(method => (
                  <label key={method} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${orderData.paymentMethod === method ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <CreditCard className={orderData.paymentMethod === method ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className="font-medium">{method}</span>
                    </div>
                    <input type="radio" name="payment" checked={orderData.paymentMethod === method} onChange={() => setOrderData({...orderData, paymentMethod: method})} className="text-indigo-600" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg font-medium ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button 
                onClick={nextStep}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={submitOrder}
                disabled={!orderData.paymentMethod}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay & Place Order
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
