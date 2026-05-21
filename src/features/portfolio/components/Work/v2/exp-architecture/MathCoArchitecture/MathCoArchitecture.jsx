import ArchitectureSection from '../../components/architecture/ArchitectureSection';
import ArchitectureCard from '../../components/architecture/ArchitectureCard';
import ArchitectureArrow from '../../components/architecture/ArchitectureArrow';
import ArchitectureFooter from '../../components/architecture/ArchitectureFooter';
import './MathCoArchitecture.css';

export const MathCoArchitecture = ({ embedded = false }) => {
  // Column 1: Clients configuration
  const clientCards = [
    { title: 'Executive', subtitle: 'Dashboards', icon: 'LayoutGrid', iconColor: 'gray' },
    { title: 'Regional', subtitle: 'Managers', icon: 'Users', iconColor: 'gray' },
    { title: 'Business', subtitle: 'Analysts', icon: 'TrendingUp', iconColor: 'gray' },
    { title: 'Mobile', subtitle: 'Users', icon: 'Smartphone', iconColor: 'gray' },
  ];

  // Column 2: Frontend configuration
  const frontendCards = [
    { title: 'React SPA', icon: 'Monitor', iconColor: 'green' },
    { title: 'UI Components', icon: 'Layers', iconColor: 'green' },
    { title: 'State Management', icon: 'Cpu', iconColor: 'green' },
    { title: 'Charts & Visualizations', icon: 'BarChart2', iconColor: 'green' },
    { title: 'RBAC UI Renderer', icon: 'ShieldCheck', iconColor: 'green' },
  ];

  // Column 3: API & Services configuration
  const apiGatewayCard = { title: 'API Gateway', icon: 'Network', iconColor: 'blue' };
  const authRbacCard = { title: 'Auth & RBAC', icon: 'ShieldCheck', iconColor: 'blue' };
  const microservices = [
    { title: 'Analytics Service', icon: 'Server', iconColor: 'blue' },
    { title: 'Report Service', icon: 'Server', iconColor: 'blue' },
    { title: 'Forecasting Service', icon: 'Server', iconColor: 'blue' },
    { title: 'User Prefs Service', icon: 'Server', iconColor: 'blue' },
    { title: 'Notification Service', icon: 'Server', iconColor: 'blue' },
  ];

  // Column 4: Data Layer configuration
  const databaseCards = [
    { title: 'PostgreSQL', subtitle: '(Operational DB)', icon: 'cylinder', iconColor: 'purple' },
    { title: 'Redis', subtitle: '(Cache)', icon: 'cylinder', iconColor: 'purple' },
    { title: 'Data Warehouse', subtitle: '(Snowflake/Redshift)', icon: 'cylinder', iconColor: 'purple' },
    { title: 'S3 Data Lake', subtitle: '', icon: 'cylinder', iconColor: 'blue' },
  ];

  // Column 5: Pipelines & Processing configuration
  const pipelineCards = [
    { title: 'ETL Ingestion', icon: 'ArrowDownCircle', iconColor: 'orange' },
    { title: 'Data Validation', icon: 'CheckSquare', iconColor: 'orange' },
    { title: 'Transformations', icon: 'RefreshCw', iconColor: 'orange' },
    { title: 'Airflow Scheduler', icon: 'Calendar', iconColor: 'orange' },
    { title: 'Batch Jobs', icon: 'Terminal', iconColor: 'orange' },
  ];

  // DevOps & Observability (Footer) configuration
  const observabilityCards = [
    { title: 'Docker', icon: 'Box', iconColor: 'blue' },
    { title: 'Kubernetes', icon: 'Layers', iconColor: 'blue' },
    { title: 'CI/CD (GitHub Actions)', icon: 'GitBranch', iconColor: 'blue' },
    { title: 'Monitoring (CloudWatch + Grafana)', icon: 'Activity', iconColor: 'blue' },
    { title: 'Logging & Tracing', icon: 'FileText', iconColor: 'blue' },
  ];

  if (embedded) {
    return (
      <div className="sa-diagram sa-embedded">
        {/* Main 5-Column Grid Layout */}
        <div className="sa-grid">
          
          {/* Column 1: Clients */}
          <div className="sa-grid-col">
            <ArchitectureSection title="Clients" dotColor="" variant="gray">
              <div className="sa-cards-list">
                {clientCards.map((card, i) => (
                  <ArchitectureCard
                    key={i}
                    title={card.title}
                    subtitle={card.subtitle}
                    icon={card.icon}
                    iconColor={card.iconColor}
                    variant="double-line"
                  />
                ))}
              </div>
            </ArchitectureSection>
          </div>

          {/* Arrow 1 -> 2 */}
          <div className="sa-connector-col">
            <ArchitectureArrow direction="horizontal" />
          </div>

          {/* Column 2: Frontend */}
          <div className="sa-grid-col sa-grid-col--frontend">
            <ArchitectureSection title="Frontend (React + TS)" dotColor="#22c55e" variant="green">
              <div className="sa-cards-list">
                {frontendCards.map((card, i) => (
                  <ArchitectureCard
                    key={i}
                    title={card.title}
                    icon={card.icon}
                    iconColor={card.iconColor}
                    variant="standard"
                  />
                ))}
              </div>
            </ArchitectureSection>
            
            {/* CDN + Edge Cache Section */}
            <ArchitectureArrow direction="up" />
            <ArchitectureCard
              title="CDN + Edge Cache"
              icon="Globe"
              iconColor="green"
              variant="standard"
              className="sa-cdn-card"
            />
          </div>

          {/* Arrow 2 -> 3 */}
          <div className="sa-connector-col">
            <ArchitectureArrow direction="horizontal" />
          </div>

          {/* Column 3: API & Services */}
          <div className="sa-grid-col sa-grid-col--api">
            <ArchitectureSection title="API & Services (FastAPI)" dotColor="#3b82f6" variant="blue">
              <div className="sa-cards-list sa-cards-list--api-top">
                <ArchitectureCard
                  title={apiGatewayCard.title}
                  icon={apiGatewayCard.icon}
                  iconColor={apiGatewayCard.iconColor}
                  variant="standard"
                />
                <ArchitectureCard
                  title={authRbacCard.title}
                  icon={authRbacCard.icon}
                  iconColor={authRbacCard.iconColor}
                  variant="standard"
                />
              </div>

              <div className="sa-api-divider" />

              <div className="sa-microservices-sub">
                <div className="sa-microservices-header">Microservices</div>
                <div className="sa-cards-list">
                  {microservices.map((card, i) => (
                    <ArchitectureCard
                      key={i}
                      title={card.title}
                      icon={card.icon}
                      iconColor={card.iconColor}
                      variant="standard"
                    />
                  ))}
                </div>
              </div>
            </ArchitectureSection>
          </div>

          {/* Arrow 3 -> 4 */}
          <div className="sa-connector-col">
            <ArchitectureArrow direction="horizontal" />
          </div>

          {/* Column 4: Data Layer */}
          <div className="sa-grid-col">
            <ArchitectureSection title="Data Layer" dotColor="#8b5cf6" variant="purple">
              <div className="sa-cards-list sa-cards-list--databases">
                {databaseCards.map((card, i) => (
                  <ArchitectureCard
                    key={i}
                    title={card.title}
                    subtitle={card.subtitle}
                    icon={card.icon}
                    iconColor={card.iconColor}
                    variant="database"
                  />
                ))}
              </div>
            </ArchitectureSection>
          </div>

          {/* Arrow 4 -> 5 */}
          <div className="sa-connector-col">
            <ArchitectureArrow direction="horizontal" />
          </div>

          {/* Column 5: Pipelines & Processing */}
          <div className="sa-grid-col sa-grid-col--pipelines">
            <ArchitectureSection title="Pipelines & Processing" dotColor="#f97316" variant="orange">
              <div className="sa-cards-list">
                {pipelineCards.map((card, i) => (
                  <ArchitectureCard
                    key={i}
                    title={card.title}
                    icon={card.icon}
                    iconColor={card.iconColor}
                    variant="standard"
                  />
                ))}
              </div>
            </ArchitectureSection>

            {/* Event Stream Section */}
            <ArchitectureArrow direction="up" />
            <ArchitectureCard
              title="Event Stream"
              subtitle="(Kafka / SQS)"
              icon="Share2"
              iconColor="orange"
              variant="database"
              className="sa-event-stream-card"
            />
          </div>

        </div>

        {/* DevOps & Observability Section */}
        <ArchitectureFooter cards={observabilityCards} />
      </div>
    );
  }

  return (
    <div className="sa-page-wrapper">
      <main className="sa-container">
        {/* Header Section */}
        <header className="sa-header">
          <div className="sa-header__title-row">
            <span className="sa-header__dot" />
            <h1 className="sa-header__title">System Architecture</h1>
          </div>
          <p className="sa-header__subtitle">High level overview of the analytics platform architecture</p>
        </header>

        {/* Diagram Visualizer Panel */}
        <div className="sa-diagram">
          {/* Main 5-Column Grid Layout */}
          <div className="sa-grid">
            
            {/* Column 1: Clients */}
            <div className="sa-grid-col">
              <ArchitectureSection title="Clients" dotColor="" variant="gray">
                <div className="sa-cards-list">
                  {clientCards.map((card, i) => (
                    <ArchitectureCard
                      key={i}
                      title={card.title}
                      subtitle={card.subtitle}
                      icon={card.icon}
                      iconColor={card.iconColor}
                      variant="double-line"
                    />
                  ))}
                </div>
              </ArchitectureSection>
            </div>

            {/* Arrow 1 -> 2 */}
            <div className="sa-connector-col">
              <ArchitectureArrow direction="horizontal" />
            </div>

            {/* Column 2: Frontend */}
            <div className="sa-grid-col sa-grid-col--frontend">
              <ArchitectureSection title="Frontend (React + TS)" dotColor="#22c55e" variant="green">
                <div className="sa-cards-list">
                  {frontendCards.map((card, i) => (
                    <ArchitectureCard
                      key={i}
                      title={card.title}
                      icon={card.icon}
                      iconColor={card.iconColor}
                      variant="standard"
                    />
                  ))}
                </div>
              </ArchitectureSection>
              
              {/* CDN + Edge Cache Section (aligned underneath) */}
              <ArchitectureArrow direction="up" />
              <ArchitectureCard
                title="CDN + Edge Cache"
                icon="Globe"
                iconColor="green"
                variant="standard"
                className="sa-cdn-card"
              />
            </div>

            {/* Arrow 2 -> 3 */}
            <div className="sa-connector-col">
              <ArchitectureArrow direction="horizontal" />
            </div>

            {/* Column 3: API & Services */}
            <div className="sa-grid-col sa-grid-col--api">
              <ArchitectureSection title="API & Services (FastAPI)" dotColor="#3b82f6" variant="blue">
                <div className="sa-cards-list sa-cards-list--api-top">
                  <ArchitectureCard
                    title={apiGatewayCard.title}
                    icon={apiGatewayCard.icon}
                    iconColor={apiGatewayCard.iconColor}
                    variant="standard"
                  />
                  <ArchitectureCard
                    title={authRbacCard.title}
                    icon={authRbacCard.icon}
                    iconColor={authRbacCard.iconColor}
                    variant="standard"
                  />
                </div>

                <div className="sa-api-divider" />

                <div className="sa-microservices-sub">
                  <div className="sa-microservices-header">Microservices</div>
                  <div className="sa-cards-list">
                    {microservices.map((card, i) => (
                      <ArchitectureCard
                        key={i}
                        title={card.title}
                        icon={card.icon}
                        iconColor={card.iconColor}
                        variant="standard"
                      />
                    ))}
                  </div>
                </div>
              </ArchitectureSection>
            </div>

            {/* Arrow 3 -> 4 */}
            <div className="sa-connector-col">
              <ArchitectureArrow direction="horizontal" />
            </div>

            {/* Column 4: Data Layer */}
            <div className="sa-grid-col">
              <ArchitectureSection title="Data Layer" dotColor="#8b5cf6" variant="purple">
                <div className="sa-cards-list sa-cards-list--databases">
                  {databaseCards.map((card, i) => (
                    <ArchitectureCard
                      key={i}
                      title={card.title}
                      subtitle={card.subtitle}
                      icon={card.icon}
                      iconColor={card.iconColor}
                      variant="database"
                    />
                  ))}
                </div>
              </ArchitectureSection>
            </div>

            {/* Arrow 4 -> 5 */}
            <div className="sa-connector-col">
              <ArchitectureArrow direction="horizontal" />
            </div>

            {/* Column 5: Pipelines & Processing */}
            <div className="sa-grid-col sa-grid-col--pipelines">
              <ArchitectureSection title="Pipelines & Processing" dotColor="#f97316" variant="orange">
                <div className="sa-cards-list">
                  {pipelineCards.map((card, i) => (
                    <ArchitectureCard
                      key={i}
                      title={card.title}
                      icon={card.icon}
                      iconColor={card.iconColor}
                      variant="standard"
                    />
                  ))}
                </div>
              </ArchitectureSection>

              {/* Event Stream Section (aligned underneath) */}
              <ArchitectureArrow direction="up" />
              <ArchitectureCard
                title="Event Stream"
                subtitle="(Kafka / SQS)"
                icon="Share2"
                iconColor="orange"
                variant="database"
                className="sa-event-stream-card"
              />
              <ArchitectureArrow direction="up" bidirectional={true} className="sa-event-stream-devops-arrow" />
            </div>

          </div>

          {/* Absolute Dashed Bus Line System */}
          <div className="sa-dashed-bus-container" aria-hidden="true">
            <div className="sa-dashed-bus-horizontal" />
            <div className="sa-dashed-bus-vertical sa-dashed-bus-vertical--cdn">
              <div className="sa-dashed-bus-arrow" />
            </div>
            <div className="sa-dashed-bus-vertical sa-dashed-bus-vertical--api">
              <div className="sa-dashed-bus-arrow" />
            </div>
            <div className="sa-dashed-bus-vertical sa-dashed-bus-vertical--data" />
          </div>

          {/* DevOps & Observability Section */}
          <ArchitectureFooter cards={observabilityCards} />
        </div>
      </main>
    </div>
  );
};

export default MathCoArchitecture;
