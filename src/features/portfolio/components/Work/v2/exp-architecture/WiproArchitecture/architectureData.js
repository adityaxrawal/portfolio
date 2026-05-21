import {
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaCreditCard,
  FaEnvelope,
  FaMobileAlt,
  FaRegFileAlt,
  FaSms,
  FaUserShield,
  FaUsers,
} from 'react-icons/fa';
import {
  SiAngular,
  SiMongodb,
  SiNginx,
  SiNodedotjs,
  SiRedis,
} from 'react-icons/si';

export const architectureSections = [
  {
    id: 'client',
    title: 'Client Layer',
    tone: 'client',
    logo: FaUsers,
    items: [
      { label: 'Web Users', icon: FaUsers },
      { label: 'Admin Panel', icon: FaUserShield },
      { label: 'Mobile Users', icon: FaMobileAlt },
    ],
    layout: 'iconRows',
  },
  {
    id: 'frontend',
    title: 'Frontend (Angular)',
    tone: 'frontend',
    logo: SiAngular,
    items: [
      { label: 'Angular SPA' },
      { label: 'Routing' },
      { label: 'State Management' },
      { label: 'HTTP Interceptors' },
    ],
  },
  {
    id: 'gateway',
    title: 'API Gateway / NGINX',
    tone: 'gateway',
    logo: SiNginx,
    items: [
      { label: 'Reverse Proxy' },
      { label: 'Load Balancing' },
      { label: 'Request Routing' },
      { label: 'Rate Limiting' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Services (Node.js)',
    tone: 'backend',
    logo: SiNodedotjs,
    wide: true,
    items: [
      { label: 'Auth Service' },
      { label: 'Product Service' },
      { label: 'Coupon Service' },
      { label: 'Order Service' },
    ],
  },
  {
    id: 'data',
    title: 'Data Layer',
    tone: 'data',
    logo: SiMongodb,
    items: [
      { label: 'MongoDB (Primary)' },
      { label: 'Redis Cache', icon: SiRedis },
      { label: 'File Storage', icon: FaRegFileAlt },
    ],
  },
  {
    id: 'external',
    title: 'External Services',
    tone: 'external',
    logo: FaCreditCard,
    items: [
      { label: 'Payment Gateway', icon: FaCreditCard },
      { label: 'Email Service', icon: FaEnvelope },
      { label: 'SMS Service', icon: FaSms },
      { label: 'Analytics Service', icon: FaChartLine },
    ],
    layout: 'iconRows',
  },
];

export const workerCards = [
  {
    label: 'Coupon Expiry Worker',
    icon: FaCog,
  },
  {
    label: 'Order Processing Worker',
    icon: FaClipboardList,
  },
  {
    label: 'Email Notification Worker',
    icon: FaEnvelope,
  },
];
