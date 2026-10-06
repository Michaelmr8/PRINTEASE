import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/customer/Home';
import Services from './pages/customer/Services';
import OrderPage from './pages/customer/OrderPage';
import TrackOrder from './pages/customer/TrackOrder';
import CustomerDashboard from './pages/customer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="track" element={<TrackOrder />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
