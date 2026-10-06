import type { Customer, Order, Service, UploadedFile } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Wijaya',
    phone: '081234567890',
    email: 'sarah.wijaya@example.com',
    address: 'Jl. Sudirman No. 45, Jakarta Selatan',
    totalOrders: 1,
    totalSpending: 75000,
    lastOrder: '2023-10-24'
  },
  {
    id: 'CUST-002',
    name: 'Andi Pratama',
    phone: '082345678901',
    email: 'andi.pratama@example.com',
    totalOrders: 5,
    totalSpending: 250000,
    lastOrder: '2023-10-20'
  },
  {
    id: 'CUST-003',
    name: 'Nadia Putri',
    phone: '083456789012',
    email: 'nadia.putri@example.com',
    totalOrders: 2,
    totalSpending: 120000,
  },
  {
    id: 'CUST-004',
    name: 'Kevin Tan',
    phone: '084567890123',
    email: 'kevin.tan@example.com',
    totalOrders: 10,
    totalSpending: 1500000,
  },
  {
    id: 'CUST-005',
    name: 'Dimas Wijaya',
    phone: '085678901234',
    email: 'dimas.w@example.com',
    totalOrders: 3,
    totalSpending: 450000,
  }
];

export const mockServices: Service[] = [
  {
    id: 'SRV-001',
    name: 'Document Printing',
    description: 'High quality A4/F4 document printing for your daily needs.',
    startingPrice: 500,
    estimatedTime: '1-2 Hours',
    icon: 'FileText'
  },
  {
    id: 'SRV-002',
    name: 'Photo Printing',
    description: 'Premium glossy or matte photo prints in various sizes.',
    startingPrice: 2000,
    estimatedTime: '2-3 Hours',
    icon: 'Image'
  },
  {
    id: 'SRV-003',
    name: 'Poster & Flyer',
    description: 'Vibrant colors for your marketing materials.',
    startingPrice: 5000,
    estimatedTime: '1 Day',
    icon: 'Layout'
  },
  {
    id: 'SRV-004',
    name: 'Custom Printing',
    description: 'Business cards, stickers, and other custom formats.',
    startingPrice: 25000,
    estimatedTime: '1-3 Days',
    icon: 'Printer'
  }
];

export const mockFiles: UploadedFile[] = [
  {
    id: 'FILE-1024',
    name: 'Marketing_Proposal_Final.pdf',
    size: 2500000, // 2.5MB
    uploadDate: '2023-10-24T09:00:00Z',
    url: '/mock/Marketing_Proposal_Final.pdf'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'PRN-1024',
    customerId: 'CUST-001',
    serviceId: 'SRV-001',
    fileId: 'FILE-1024',
    specifications: {
      paperSize: 'A4',
      paperType: 'HVS 80gsm',
      color: true,
      doubleSided: false,
      quantity: 50
    },
    total: 75000,
    status: 'Printing',
    deliveryMethod: 'Pickup',
    estimatedCompletion: 'Today, 16:30',
    createdAt: '2023-10-24T09:15:00Z',
    paymentMethod: 'QRIS'
  },
  {
    id: 'PRN-1023',
    customerId: 'CUST-002',
    serviceId: 'SRV-003',
    fileId: 'FILE-1023',
    specifications: {
      paperSize: 'A3',
      paperType: 'Art Paper 150gsm',
      color: true,
      doubleSided: false,
      quantity: 100
    },
    total: 500000,
    status: 'Ready',
    deliveryMethod: 'Delivery',
    deliveryStatus: 'Waiting for Pickup',
    estimatedCompletion: 'Today, 14:00',
    createdAt: '2023-10-24T08:00:00Z',
    paymentMethod: 'Bank Transfer'
  }
];
