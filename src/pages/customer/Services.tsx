import { Link } from 'react-router-dom';
import { mockServices } from '../../data/mockData';
import { FileText, Image, Layout, Printer, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={32} />,
  Image: <Image size={32} />,
  Layout: <Layout size={32} />,
  Printer: <Printer size={32} />
};

export default function Services() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            High-quality printing services for all your needs. Fast, reliable, and affordable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col">
              <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                {service.icon ? iconMap[service.icon] : <Printer size={32} />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
              
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Starting at</span>
                  <span className="font-bold text-indigo-600">Rp {service.startingPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-500">Est. Time</span>
                  <span className="font-medium text-gray-900">{service.estimatedTime}</span>
                </div>
                <Link to="/order" className="w-full bg-gray-50 hover:bg-indigo-600 hover:text-white text-indigo-600 border border-indigo-100 font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
                  Order Now <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
