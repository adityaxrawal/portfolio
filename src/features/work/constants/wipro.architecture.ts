import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const wiproArchitecture: ArchitectureDiagramConfig = {
  company: 'Wipro',
  rows: [
    {
      id: 'client',
      layerLabel: 'CLIENT\nLAYER',
      nodes: [
        { id: 'web',    label: 'Web Users',    icon: 'Globe',      iconColor: '#64748b' },
        { id: 'admin',  label: 'Admin Panel',  icon: 'ShieldCheck', iconColor: '#64748b' },
        { id: 'mobile', label: 'Mobile Users', icon: 'Smartphone', iconColor: '#64748b' },
      ],
      connectorToNext: 'solid',
    },
    {
      id: 'frontend',
      layerLabel: 'FRONTEND',
      nodes: [
        {
          id: 'spa',
          label: 'Angular SPA',
          subLabel: 'E-commerce Storefront',
          icon: 'SiAngular',
          iconColor: '#DD0031',
          highlight: true,
        },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 4, // branches to 4 GATEWAY nodes
    },
    {
      id: 'gateway',
      layerLabel: 'API\nGATEWAY',
      nodes: [
        { id: 'proxy',   label: 'Reverse Proxy',   subLabel: '(NGINX)',  icon: 'SiNginx',  iconColor: '#009639' },
        { id: 'lb',      label: 'Load Balancing',                         icon: 'Network',  iconColor: '#3b82f6' },
        { id: 'routing', label: 'Request Routing',                        icon: 'Share2',   iconColor: '#8B5CF6' },
        { id: 'rate',    label: 'Rate Limiting',                          icon: 'Shield',   iconColor: '#f59e0b' },
      ],
      connectorToNext: 'solid',
    },
    {
      id: 'backend',
      layerLabel: 'BACKEND\nSERVICES',
      nodes: [
        { id: 'auth',    label: 'Auth Service',    icon: 'Key',        iconColor: '#64748b' },
        { id: 'product', label: 'Product Service', icon: 'Box',        iconColor: '#3b82f6' },
        { id: 'coupon',  label: 'Coupon Service',  icon: 'Target',     iconColor: '#10b981' },
        { id: 'order',   label: 'Order Service',   icon: 'CheckSquare', iconColor: '#f97316' },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 3, // → 3 DATA nodes
    },
    {
      id: 'data',
      layerLabel: 'DATA\nLAYER',
      nodes: [
        { id: 'mongo', label: 'MongoDB',      subLabel: '(Primary)', icon: 'SiMongodb', iconColor: '#47A248' },
        { id: 'redis', label: 'Redis',        subLabel: '(Cache)',   icon: 'SiRedis',   iconColor: '#DC382D' },
        { id: 'file',  label: 'File Storage', subLabel: '(Assets)', icon: 'Archive',   iconColor: '#64748b' },
      ],
      connectorToNext: 'dashed',
      connectorArrowCount: 4, // dashed → 4 EXTERNAL nodes
    },
    {
      id: 'external',
      layerLabel: 'EXTERNAL\nSERVICES',
      nodes: [
        { id: 'payment',   label: 'Payment Gateway', icon: 'FaCreditCard', iconColor: '#10b981' },
        { id: 'email',     label: 'Email Service',   icon: 'Mail',         iconColor: '#3b82f6' },
        { id: 'sms',       label: 'SMS Service',     icon: 'FaSms',        iconColor: '#f59e0b' },
        { id: 'analytics', label: 'Analytics',       icon: 'Activity',     iconColor: '#8B5CF6' },
      ],
      connectorToNext: 'none',
    },
  ],
};
