import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const wiproArchitecture: ArchitectureDiagramConfig = {
  company: 'Wipro',
  columns: [
    {
      id: 'client',
      title: 'Client Layer',
      accent: '#8b5cf6', // purple
      nodes: [
        { id: 'web', label: 'Web Users', icon: 'FaUsers' },
        { id: 'admin', label: 'Admin Panel', icon: 'FaUserShield' },
        { id: 'mobile', label: 'Mobile Users', icon: 'FaMobileAlt' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend (Angular)',
      accent: '#0ea5e9', // sky blue
      nodes: [
        { id: 'spa', label: 'Angular SPA', icon: 'SiAngular' },
        { id: 'routing', label: 'Routing' },
        { id: 'state', label: 'State Management' },
        { id: 'interceptors', label: 'HTTP Interceptors' },
      ],
    },
    {
      id: 'gateway',
      title: 'API Gateway / NGINX',
      accent: '#14b8a6', // teal
      nodes: [
        { id: 'proxy', label: 'Reverse Proxy', icon: 'SiNginx' },
        { id: 'lb', label: 'Load Balancing' },
        { id: 'routing', label: 'Request Routing' },
        { id: 'rate', label: 'Rate Limiting' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend Services (Node.js)',
      accent: '#6366f1', // indigo
      nodes: [
        { id: 'auth', label: 'Auth Service', icon: 'SiNodedotjs' },
        { id: 'product', label: 'Product Service' },
        { id: 'coupon', label: 'Coupon Service' },
        { id: 'order', label: 'Order Service' },
      ],
    },
    {
      id: 'data',
      title: 'Data Layer',
      accent: '#f59e0b', // amber
      nodes: [
        { id: 'mongo', label: 'MongoDB', subLabel: '(Primary)', icon: 'SiMongodb' },
        { id: 'redis', label: 'Redis', subLabel: '(Cache)', icon: 'SiRedis' },
        { id: 'file', label: 'File Storage', icon: 'FaRegFileAlt' },
      ],
    },
    {
      id: 'external',
      title: 'External Services',
      accent: '#ec4899', // pink
      nodes: [
        { id: 'payment', label: 'Payment Gateway', icon: 'FaCreditCard' },
        { id: 'email', label: 'Email Service', icon: 'FaEnvelope' },
        { id: 'sms', label: 'SMS Service', icon: 'FaSms' },
        { id: 'analytics', label: 'Analytics Service', icon: 'FaChartLine' },
      ],
    },
  ],
  footerBands: [
    {
      id: 'workers',
      title: 'Background Workers',
      nodes: [
        { id: 'coupon-worker', label: 'Coupon Expiry Worker', icon: 'FaCog' },
        { id: 'order-worker', label: 'Order Processing Worker', icon: 'FaClipboardList' },
        { id: 'email-worker', label: 'Email Notification Worker', icon: 'FaEnvelope' },
      ],
    },
  ],
};
