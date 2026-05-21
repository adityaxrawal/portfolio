import React from 'react';
import './LeadSquaredArchitecture.css';
import { LsSection, LsCard, LsArrow, LsQueueSection } from './LeadSquaredComponents';

export const LeadSquaredArchitecture = ({ embedded = false }) => {
  return (
    <div className={`ls-diagram-wrapper ${embedded ? 'ls-diagram-wrapper--embedded' : ''}`}>
      {!embedded && (
        <div className="ls-header">
          <span className="ls-header-dot" />
          <h1 className="ls-header-title">System Architecture</h1>
        </div>
      )}

      <div className="ls-diagram-container">
        
        {/* Main 6-column row */}
        <div className="ls-diagram-grid">
          
          {/* COLUMN 1: CLIENTS */}
          <div className="ls-col ls-col--clients">
            <LsSection title="CLIENTS">
              <div className="ls-col-stack">
                <LsCard title="CRM Users" icon="User" iconColor="gray" />
                <LsCard title="Sales Teams" icon="Users" iconColor="gray" />
                <LsCard title="Admin Users" icon="UserCog" iconColor="gray" />
                <LsCard title="Third-party Apps" icon="Package" iconColor="gray" />
              </div>
            </LsSection>
          </div>

          <LsArrow direction="horizontal" className="ls-flow-arrow" />

          {/* COLUMN 2: FRONTEND LAYER */}
          <div className="ls-col ls-col--frontend">
            <LsSection title="FRONTEND LAYER">
              <div className="ls-col-stack">
                <LsCard 
                  title="React Micro Frontends" 
                  icon="Atom" 
                  iconColor="blue" 
                  centered={true} 
                  className="ls-card--tall"
                />
                <LsCard 
                  title="Embedded Widgets" 
                  centered={true}
                />
                <LsCard 
                  title="TypeScript UI Modules" 
                  centered={true}
                />
              </div>
            </LsSection>
          </div>

          <LsArrow direction="horizontal" className="ls-flow-arrow" />

          {/* COLUMN 3: EDGE & SECURITY */}
          <div className="ls-col ls-col--edge">
            <LsSection title="EDGE & SECURITY">
              <div className="ls-col-stack">
                <LsCard title="CloudFront" subtitle="CDN" icon="Globe" iconColor="purple" />
                <div className="ls-vertical-connector"><LsArrow direction="both" /></div>
                <LsCard title="WAF" icon="Shield" iconColor="purple" />
                <div className="ls-vertical-connector"><LsArrow direction="both" /></div>
                <LsCard title="API" subtitle="& Gateway" icon="AppWindow" iconColor="purple" />
              </div>
            </LsSection>
          </div>

          <LsArrow direction="horizontal" className="ls-flow-arrow" />

          {/* COLUMN 4: SERVERLESS BACKEND (AWS) */}
          <div className="ls-col ls-col--backend">
            <LsSection title="SERVERLESS BACKEND (AWS)" className="ls-section--large">
              <div className="ls-backend-grid">
                <LsCard title="Lambda APIs" subtitle="(Node.js)" icon="Zap" iconColor="orange" />
                <LsCard title="Workflow" subtitle="Engine" icon="Zap" iconColor="orange" />
                <LsCard title="Webhook" subtitle="Processors" icon="Zap" iconColor="orange" />
                <LsCard title="Notification" subtitle="Service" icon="Zap" iconColor="orange" />
                <LsCard title="Batch" subtitle="Workers" icon="Zap" iconColor="orange" />
                <LsCard title="Auth Service" subtitle="(JWT)" icon="Zap" iconColor="orange" />
              </div>
            </LsSection>
          </div>

          <LsArrow direction="horizontal" className="ls-flow-arrow" />

          {/* COLUMN 5: DATA & CACHE */}
          <div className="ls-col ls-col--data">
            <LsSection title="DATA & CACHE" className="ls-section--blue-bg">
              <div className="ls-col-stack">
                <LsCard title="DynamoDB" subtitle="(Primary)" icon="Database" iconColor="blue" />
                <LsCard title="RDS" subtitle="(Transactional)" icon="DatabaseZap" iconColor="blue" />
                <LsCard title="Redis" subtitle="(Cache)" icon="DatabaseBackup" iconColor="blue" />
                <LsCard title="S3" subtitle="(Files/Exports)" icon="Archive" iconColor="green" />
              </div>
            </LsSection>
          </div>

          <LsArrow direction="horizontal" className="ls-flow-arrow" />

          {/* COLUMN 6: INTEGRATIONS */}
          <div className="ls-col ls-col--integrations">
            <LsSection title="INTEGRATIONS" className="ls-section--orange-bg">
              <div className="ls-col-stack">
                <LsCard title="Email" subtitle="Services" icon="Mail" iconColor="gray" />
                <LsCard title="Marketing" subtitle="Platforms" icon="RefreshCw" iconColor="gray" />
                <LsCard title="CRM" subtitle="Providers" icon="Users" iconColor="gray" />
                <LsCard title="OAuth" subtitle="Providers" icon="Key" iconColor="gray" />
              </div>
            </LsSection>
          </div>

        </div>

        {/* Vertical connectors to Queues */}
        <div className="ls-queue-connectors">
          <LsArrow direction="down" dashed={true} className="ls-q-arrow ls-q-arrow--1" />
          <LsArrow direction="up" dashed={true} className="ls-q-arrow ls-q-arrow--2" />
          <LsArrow direction="down" dashed={true} className="ls-q-arrow ls-q-arrow--3" />
        </div>

        {/* BOTTOM FLOATING SECTION: EVENTS & QUEUES */}
        <div className="ls-queue-wrapper">
          <LsQueueSection 
            title="EVENTS & QUEUES"
            cards={[
              { title: 'SQS Queues', icon: 'Target', iconColor: 'pink' },
              { title: 'EventBridge', subtitle: '(Event Bus)', icon: 'Settings', iconColor: 'pink' },
              { title: 'Dead Letter', subtitle: 'Queue', icon: 'AlertTriangle', iconColor: 'pink' },
            ]}
          />
        </div>

      </div>
    </div>
  );
};
