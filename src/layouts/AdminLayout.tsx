import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Folder, CreditCard, Truck, BarChart2, Settings, Printer } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Production', path: '/admin/production', icon: Printer },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Files', path: '/admin/files', icon: Folder },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Delivery', path: '/admin/delivery', icon: Truck },
    { name: 'Reports', path: '/admin/reports', icon: BarChart2 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Printer className="h-6 w-6 text-indigo-600 mr-2" />
          <span className="font-bold text-lg text-gray-900 tracking-tight">PrintEase Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="font-medium text-gray-800">Admin Portal</div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
