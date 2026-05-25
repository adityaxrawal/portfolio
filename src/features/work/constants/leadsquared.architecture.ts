import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const leadsquaredArchitecture: ArchitectureDiagramConfig = {
  company: 'LeadSquared',
  rows: [
    {
      id: 'clients',
      layerLabel: 'CLIENT\nLAYER',
      nodes: [
        { id: 'crm-users',   label: 'CRM Users',          icon: 'Users',      iconColor: '#64748b' },
        { id: 'sales-teams', label: 'Sales Teams',         icon: 'UserCog',    iconColor: '#64748b' },
        { id: 'admin-users', label: 'Admin Users',         icon: 'ShieldCheck', iconColor: '#64748b' },
        { id: '3p-apps',     label: 'Third-party Apps',   icon: 'Globe',      iconColor: '#64748b' },
      ],
      connectorToNext: 'solid',
    },
    {
      id: 'frontend',
      layerLabel: 'FRONTEND',
      nodes: [
        {
          id: 'react-mfe',
          label: 'React Micro Frontends',
          subLabel: 'TypeScript UI Modules',
          icon: 'SiReact',
          iconColor: '#61DAFB',
          highlight: true,
        },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 3, // branches to 3 EDGE nodes
    },
    {
      id: 'edge',
      layerLabel: 'EDGE &\nSECURITY',
      nodes: [
        { id: 'cloudfront', label: 'CloudFront',   subLabel: '(CDN)',              icon: 'Cloud',    iconColor: '#f97316' },
        { id: 'waf',        label: 'WAF',           subLabel: '(Web App Firewall)', icon: 'Shield',   iconColor: '#ef4444' },
        { id: 'api-gw',     label: 'API Gateway',   subLabel: '(Request Routing)',  icon: 'Network',  iconColor: '#8B5CF6' },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 4, // branches to 4 BACKEND nodes
    },
    {
      id: 'backend',
      layerLabel: 'BACKEND\nSERVICES',
      nodes: [
        { id: 'lambda',    label: 'Lambda APIs',    subLabel: '(Node.js)',   icon: 'Zap',      iconColor: '#f97316', highlight: true },
        { id: 'workflow',  label: 'Workflow Engine',                         icon: 'Workflow',  iconColor: '#8B5CF6' },
        { id: 'webhooks',  label: 'Webhook Processors',                      icon: 'RefreshCw', iconColor: '#06b6d4' },
        { id: 'auth',      label: 'Auth Service',   subLabel: '(JWT)',       icon: 'Key',       iconColor: '#64748b' },
      ],
      connectorToNext: 'solid',
    },
    {
      id: 'data',
      layerLabel: 'DATA &\nCACHE',
      nodes: [
        { id: 'dynamo', label: 'DynamoDB',  subLabel: '(Primary)',        icon: 'Database',  iconColor: '#4f46e5' },
        { id: 'rds',    label: 'RDS',       subLabel: '(Transactional)',  icon: 'Server',    iconColor: '#0ea5e9' },
        { id: 'redis',  label: 'Redis',     subLabel: '(Cache)',          icon: 'SiRedis',   iconColor: '#DC382D' },
        { id: 's3',     label: 'S3',        subLabel: '(Files/Exports)',  icon: 'Archive',   iconColor: '#3CB054' },
      ],
      connectorToNext: 'dashed',
      connectorArrowCount: 3, // dashed → 3 EVENT nodes
    },
    {
      id: 'events',
      layerLabel: 'EVENTS &\nQUEUES',
      nodes: [
        { id: 'sqs',         label: 'SQS Queues',       subLabel: '(Message Queue)', icon: 'Archive',       iconColor: '#f59e0b' },
        { id: 'eventbridge', label: 'EventBridge',       subLabel: '(Event Bus)',      icon: 'Target',        iconColor: '#8B5CF6' },
        { id: 'dlq',         label: 'Dead Letter Queue', subLabel: '(Failed Events)', icon: 'AlertTriangle', iconColor: '#ef4444' },
      ],
      connectorToNext: 'none',
    },
  ],
};
