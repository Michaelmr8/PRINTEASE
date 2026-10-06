import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle, Clock, Truck, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:flex lg:items-center lg:gap-12">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Printing made <span className="text-indigo-600">simple.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Upload your file, customize your print, pay online, and track your order without waiting in line. The modern way to handle all your printing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/order" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Start Printing <ArrowRight size={20} />
              </Link>
              <Link to="/track" className="bg-white border-2 border-gray-200 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-8 py-4 rounded-full font-medium text-lg transition-all flex items-center justify-center">
                Track My Order
              </Link>
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-50 transform translate-x-10 -translate-y-10"></div>
            <div className="glass-card rounded-2xl p-6 shadow-2xl relative z-10 w-full max-w-md border border-white">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Order #PRN-1024</div>
                  <div className="font-bold text-gray-900">Marketing_Proposal.pdf</div>
                </div>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                  Printing
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 bg-indigo-600 rounded-full"></div>
                    <div className="w-0.5 h-10 bg-indigo-600"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">In Queue</div>
                    <div className="text-xs text-gray-500">10:15 AM</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 bg-indigo-600 rounded-full ring-4 ring-indigo-100"></div>
                    <div className="w-0.5 h-10 bg-gray-200"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-indigo-600">Printing</div>
                    <div className="text-xs text-gray-500">Estimated completion: 11:30 AM</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-400">Ready for Pickup</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PrintEase?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We've reimagined the printing experience to save you time and hassle.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Waiting in Line</h3>
              <p className="text-gray-600">Order from your phone or laptop anywhere, anytime. We'll notify you when it's ready.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Quality</h3>
              <p className="text-gray-600">Every print goes through our quality check process to ensure perfect results.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery Options</h3>
              <p className="text-gray-600">Pick it up at our store or get it delivered directly to your home or office.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-indigo-600 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to print your next project?</h2>
          <p className="text-indigo-100 text-lg mb-10">Join thousands of students and professionals who trust PrintEase.</p>
          <Link to="/order" className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg inline-block">
            Start Your Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}
