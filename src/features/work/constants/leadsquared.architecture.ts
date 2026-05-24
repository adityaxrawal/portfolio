import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const leadsquaredArchitecture: ArchitectureDiagramConfig = {
  company: 'LeadSquared',
  columns: [
    {
      id: 'clients',
      title: 'Clients',
      accent: '#64748b', // slate
      nodes: [
        { id: 'crm-users', label: 'CRM Users', icon: 'User' },
        { id: 'sales-teams', label: 'Sales Teams', icon: 'Users' },
        { id: 'admin-users', label: 'Admin Users', icon: 'UserCog' },
        { id: '3p-apps', label: 'Third-party Apps', icon: 'Package' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Layer',
      accent: '#3b82f6', // blue
      nodes: [
        { id: 'react-mfe', label: 'React Micro Frontends', icon: 'Atom' },
        { id: 'widgets', label: 'Embedded Widgets' },
        { id: 'ts-modules', label: 'TypeScript UI Modules' },
      ],
    },
    {
      id: 'edge',
      title: 'Edge & Security',
      accent: '#a855f7', // purple
      nodes: [
        { id: 'cloudfront', label: 'CloudFront', subLabel: 'CDN', icon: 'Globe' },
        { id: 'waf', label: 'WAF', icon: 'Shield' },
        { id: 'api-gw', label: 'API & Gateway', icon: 'AppWindow' },
      ],
    },
    {
      id: 'backend',
      title: 'Serverless Backend (AWS)',
      accent: '#f97316', // orange
      nodes: [
        { id: 'lambda', label: 'Lambda APIs', subLabel: '(Node.js)', icon: 'Zap' },
        { id: 'workflow', label: 'Workflow Engine', icon: 'Zap' },
        { id: 'webhooks', label: 'Webhook Processors', icon: 'Zap' },
        { id: 'notifications', label: 'Notification Service', icon: 'Zap' },
        { id: 'batch', label: 'Batch Workers', icon: 'Zap' },
        { id: 'auth', label: 'Auth Service', subLabel: '(JWT)', icon: 'Zap' },
      ],
    },
    {
      id: 'data',
      title: 'Data & Cache',
      accent: '#0ea5e9', // sky
      nodes: [
        { id: 'dynamo', label: 'DynamoDB', subLabel: '(Primary)', icon: 'Database' },
        { id: 'rds', label: 'RDS', subLabel: '(Transactional)', icon: 'DatabaseZap' },
        { id: 'redis', label: 'Redis', subLabel: '(Cache)', icon: 'DatabaseBackup' },
        { id: 's3', label: 'S3', subLabel: '(Files/Exports)', icon: 'Archive' },
      ],
    },
    {
      id: 'integrations',
      title: 'Integrations',
      accent: '#f59e0b', // amber
      nodes: [
        { id: 'email', label: 'Email Services', icon: 'Mail' },
        { id: 'marketing', label: 'Marketing Platforms', icon: 'RefreshCw' },
        { id: 'crm', label: 'CRM Providers', icon: 'Users' },
        { id: 'oauth', label: 'OAuth Providers', icon: 'Key' },
      ],
    },
  ],
  footerBands: [
    {
      id: 'events',
      title: 'Events & Queues',
      nodes: [
        { id: 'sqs', label: 'SQS Queues', icon: 'Target' },
        { id: 'eventbridge', label: 'EventBridge', subLabel: '(Event Bus)', icon: 'Settings' },
        { id: 'dlq', label: 'Dead Letter Queue', icon: 'AlertTriangle' },
      ],
    },
  ],
};
