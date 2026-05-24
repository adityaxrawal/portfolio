import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const mathcoArchitecture: ArchitectureDiagramConfig = {
  company: 'MathCo',
  columns: [
    {
      id: 'clients',
      title: 'Clients',
      accent: '#64748b', // slate
      nodes: [
        { id: 'exec', label: 'Executive Dashboards', icon: 'LayoutGrid' },
        { id: 'regional', label: 'Regional Managers', icon: 'Users' },
        { id: 'analysts', label: 'Business Analysts', icon: 'TrendingUp' },
        { id: 'mobile', label: 'Mobile Users', icon: 'Smartphone' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend (React + TS)',
      accent: '#22c55e', // green
      nodes: [
        { id: 'spa', label: 'React SPA', icon: 'Monitor' },
        { id: 'ui', label: 'UI Components', icon: 'Layers' },
        { id: 'state', label: 'State Management', icon: 'Cpu' },
        { id: 'charts', label: 'Charts & Visualizations', icon: 'BarChart2' },
        { id: 'rbac-ui', label: 'RBAC UI Renderer', icon: 'ShieldCheck' },
        { id: 'cdn', label: 'CDN + Edge Cache', icon: 'Globe' },
      ],
    },
    {
      id: 'api',
      title: 'API & Services (FastAPI)',
      accent: '#3b82f6', // blue
      nodes: [
        { id: 'gateway', label: 'API Gateway', icon: 'Network' },
        { id: 'auth', label: 'Auth & RBAC', icon: 'ShieldCheck' },
        { id: 'analytics-svc', label: 'Analytics Service', icon: 'Server' },
        { id: 'report-svc', label: 'Report Service', icon: 'Server' },
        { id: 'forecast-svc', label: 'Forecasting Service', icon: 'Server' },
        { id: 'prefs-svc', label: 'User Prefs Service', icon: 'Server' },
        { id: 'notify-svc', label: 'Notification Service', icon: 'Server' },
      ],
    },
    {
      id: 'data',
      title: 'Data Layer',
      accent: '#8b5cf6', // purple
      nodes: [
        { id: 'postgres', label: 'PostgreSQL', subLabel: '(Operational DB)', icon: 'cylinder' },
        { id: 'redis', label: 'Redis', subLabel: '(Cache)', icon: 'cylinder' },
        { id: 'dw', label: 'Data Warehouse', subLabel: '(Snowflake/Redshift)', icon: 'cylinder' },
        { id: 's3', label: 'S3 Data Lake', icon: 'cylinder' },
      ],
    },
    {
      id: 'pipelines',
      title: 'Pipelines & Processing',
      accent: '#f97316', // orange
      nodes: [
        { id: 'etl', label: 'ETL Ingestion', icon: 'ArrowDownCircle' },
        { id: 'validation', label: 'Data Validation', icon: 'CheckSquare' },
        { id: 'transform', label: 'Transformations', icon: 'RefreshCw' },
        { id: 'airflow', label: 'Airflow Scheduler', icon: 'Calendar' },
        { id: 'batch', label: 'Batch Jobs', icon: 'Terminal' },
        { id: 'events', label: 'Event Stream', subLabel: '(Kafka / SQS)', icon: 'Share2' },
      ],
    },
  ],
  footerBands: [
    {
      id: 'devops',
      title: 'DevOps & Observability',
      nodes: [
        { id: 'docker', label: 'Docker', icon: 'Box' },
        { id: 'k8s', label: 'Kubernetes', icon: 'Layers' },
        { id: 'cicd', label: 'CI/CD (GitHub Actions)', icon: 'GitBranch' },
        { id: 'monitoring', label: 'Monitoring (CloudWatch + Grafana)', icon: 'Activity' },
        { id: 'logging', label: 'Logging & Tracing', icon: 'FileText' },
      ],
    },
  ],
};
