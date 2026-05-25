import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const mathcoArchitecture: ArchitectureDiagramConfig = {
  company: 'MathCo',
  rows: [
    {
      id: 'clients',
      layerLabel: 'CLIENT\nLAYER',
      nodes: [
        { id: 'exec',     label: 'Executive Users',    icon: 'Users',    iconColor: '#64748b' },
        { id: 'analysts', label: 'Business Analysts',  icon: 'BarChart2', iconColor: '#64748b' },
        { id: 'brand',    label: 'Brand Managers',     icon: 'User',      iconColor: '#64748b' },
      ],
      connectorToNext: 'solid',
      // 3 arrows from each client node → FRONTEND wide node
    },
    {
      id: 'frontend',
      layerLabel: 'FRONTEND',
      nodes: [
        {
          id: 'spa',
          label: 'React.js + TypeScript',
          subLabel: 'Interactive Dashboards',
          icon: 'SiReact',
          iconColor: '#61DAFB',
          highlight: true,
        },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 1, // single center arrow → BACKEND
    },
    {
      id: 'backend',
      layerLabel: 'BACKEND\nSERVICES',
      nodes: [
        {
          id: 'api',
          label: 'FastAPI (Python)',
          subLabel: 'RESTful APIs',
          icon: 'SiFastapi',
          iconColor: '#009688',
        },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 4, // branches to 4 DATA LAYER nodes
    },
    {
      id: 'data',
      layerLabel: 'DATA\nLAYER',
      nodes: [
        { id: 'postgres', label: 'PostgreSQL',      subLabel: '(Operational DB)',   icon: 'SiPostgresql',   iconColor: '#336791' },
        { id: 'redis',    label: 'Redis',            subLabel: '(Cache)',            icon: 'SiRedis',        iconColor: '#DC382D' },
        { id: 'redshift', label: 'Amazon Redshift',  subLabel: '(Data Warehouse)',   icon: 'Database',       iconColor: '#8B5CF6' },
        { id: 's3',       label: 'Amazon S3',        subLabel: '(Data Lake)',        icon: 'Archive',        iconColor: '#3CB054' },
      ],
      connectorToNext: 'dashed',
      connectorArrowCount: 2, // dashed → 2 PIPELINE nodes
    },
    {
      id: 'pipelines',
      layerLabel: 'DATA\nPIPELINES',
      nodes: [
        { id: 'airflow', label: 'Airflow',   subLabel: '(ETL Orchestration)', icon: 'SiApacheairflow', iconColor: '#017CEE' },
        { id: 'glue',    label: 'AWS Glue',  subLabel: '(Data Preparation)',  icon: 'Filter',          iconColor: '#8B5CF6' },
      ],
      intraRowArrows: [{ from: 'airflow', to: 'glue', style: 'dashed' }],
      connectorToNext: 'dashed',
      connectorArrowCount: 4, // dashed → 4 DATA SOURCE nodes
    },
    {
      id: 'sources',
      layerLabel: 'DATA\nSOURCES',
      nodes: [
        { id: 'internal',   label: 'Internal Systems',  subLabel: '(CRM, ERP, etc.)',       icon: 'Building2',  iconColor: '#64748b' },
        { id: 'models',     label: 'Analytical Models', subLabel: '(DS / ML Pipelines)',    icon: 'TrendingUp', iconColor: '#3b82f6' },
        { id: 'thirdparty', label: 'Third-party Data',  subLabel: '(Market, External)',     icon: 'Globe',      iconColor: '#0ea5e9' },
        { id: 'manual',     label: 'Manual Uploads',    subLabel: '(Spreadsheets)',         icon: 'Upload',     iconColor: '#64748b' },
      ],
      connectorToNext: 'none',
    },
  ],
};
