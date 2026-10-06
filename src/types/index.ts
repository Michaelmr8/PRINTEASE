export type OrderStatus = 'Pending Payment' | 'Payment Confirmed' | 'Order Received' | 'In Queue' | 'Printing' | 'Quality Check' | 'Ready' | 'Completed' | 'Cancelled';
export type DeliveryStatus = 'Waiting for Pickup' | 'Picked Up' | 'In Delivery' | 'Delivered' | 'Completed';
export type DeliveryMethod = 'Pickup' | 'Delivery';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  totalOrders: number;
  totalSpending: number;
  lastOrder?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  estimatedTime: string;
  icon?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number; // in bytes
  url?: string;
  uploadDate: string;
}

export interface Order {
  id: string;
  customerId: string;
  serviceId: string;
  fileId: string;
  specifications: {
    paperSize: string;
    paperType: string;
    color: boolean;
    doubleSided: boolean;
    quantity: number;
  };
  total: number;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  deliveryStatus?: DeliveryStatus;
  estimatedCompletion: string;
  createdAt: string;
  paymentMethod: string;
}
