import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  Mail,
  User2,
} from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import {
  SiFramer,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import { WorldMap } from './WorldMap';

import { ContactInfo } from '@/features/contact';
import { ProjectSparkline } from '@/features/portfolio/components/Project/v2/ProjectSparkline';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  footerBox,
  hoverLift,
  hoverSpring,
} from '@/lib/animations';
import './Footer.css';

const SectionLabel = () => (
  <div className="footer-section-label">
    <span>&#x25CF; CONTACT CHANNEL &#x25CF;</span>
  </div>
);

const Headline = () => (
  <div className="footer-headline">
    <h1>
      Let&apos;s build
      <br />
      <span className="footer-headline-underline-wrapper">
        what&apos;s next.
        <svg
          className="footer-headline-svg"
          viewBox="0 0 330 10"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0,6 C 40,2 80,9 160,5 C 220,2 270,8 330,5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </span>
    </h1>
  </div>
);

const Subtitle = () => (
  <p className="footer-subtitle">
    I&apos;m open to interesting problems,
    <br />
    collaborations and full-time opportunities.
  </p>
);

const CTARow = ({ onOpenContact }: { onOpenContact: () => void }) => (
  <div className="footer-cta-row">
    <motion.button
      className="cta-button"
      onClick={onOpenContact}
      {...hoverSpring}
    >
      <span className="cta-button-text">LET&apos;S SHIP</span>
      <div className="cta-button-icon">
        <ArrowRight size={16} strokeWidth={2} color="currentColor" />
      </div>
    </motion.button>
    <div className="cta-arrow-desktop">&rarr;</div>
    <div className="cta-availability">
      Available for select opportunities
      <span className="cta-availability-dot">&#x25CF;</span>
    </div>
  </div>
);

interface ServiceCardProps {
  icon: React.ElementType<{
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }>;
  iconBg: string;
  iconColor: string;
  title: string;
  titleMobile?: string;
  description: string;
}

const ServiceCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  titleMobile,
  description,
}: ServiceCardProps) => (
  <motion.div className="service-card" variants={footerBox} {...hoverLift}>
    <div className="service-card-header">
      <div
        className="service-card-icon-wrapper"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} color={iconColor} />
      </div>
      <div className="service-card-dot" />
    </div>
    <div>
      {titleMobile ? (
        <>
          <h3 className="service-card-title desktop-only">{title}</h3>
          <h3 className="service-card-title mobile-only">{titleMobile}</h3>
        </>
      ) : (
        <h3 className="service-card-title">{title}</h3>
      )}
      <p className="service-card-desc">{description}</p>
    </div>
  </motion.div>
);

const SystemStatusCard = () => (
  <motion.div
    className="system-status-card"
    variants={footerBox}
    {...hoverLift}
  >
    <div className="system-status-left">
      <div className="system-status-header">
        <span className="system-status-arrow">&gt;_</span>
        <span className="system-status-title">SYSTEM STATUS</span>
        <span className="system-status-dot">&#x25CF;</span>
      </div>
      <div>
        <div className="system-status-active">ACTIVE</div>
        <div className="system-status-desc">All systems operational</div>
      </div>
    </div>
    <div className="radar-container">
      <div className="radar-circle radar-circle-outer radar-outer" />
      <div className="radar-circle radar-circle-mid" />
      <div className="radar-circle radar-circle-inner" />
      <div className="radar-center-dot" />
    </div>
  </motion.div>
);

const CopyrightBlock = () => (
  <div className="copyright-container">
    <div className="copyright-icon-box">
      <div className="copyright-icon-dot" />
    </div>
    <div className="copyright-text-col">
      <div className="copyright-line1">© 2026 ADITYARAWAL</div>
      <div className="copyright-line2">ALL RIGHTS RESERVED</div>
    </div>
  </div>
);

const BuiltWithBlock = () => (
  <div className="built-with-container">
    <div className="bottom-block-title">BUILT WITH</div>
    <div className="tech-stack-row">
      <div className="tech-item">
        <SiNextdotjs size={18} color="#000000" />
        <span className="tech-name">Next.js</span>
      </div>
      <span className="tech-separator">•</span>
      <div className="tech-item">
        <SiTypescript size={18} color="#3178C6" />
        <span className="tech-name">TypeScript</span>
      </div>
      <span className="tech-separator tech-separator-desktop-only">•</span>
      <div className="tech-item tech-item-desktop-only">
        <SiTailwindcss size={18} color="#06B6D4" />
        <span className="tech-name">Tailwind CSS</span>
      </div>
      <span className="tech-separator tech-separator-xl-only">•</span>
      <div className="tech-item tech-item-xl-only">
        <SiFramer size={18} color="#8B5CF6" />
        <span className="tech-name">Framer Motion</span>
      </div>
    </div>
  </div>
);

const NetworkBlock = () => (
  <div className="network-container">
    <div className="bottom-block-title">
      NETWORK <ArrowUpRight size={12} color="#9A9A9A" />
    </div>
    <div className="social-links-row">
      <motion.a
        {...hoverSpring}
        href="https://github.com/adityaxrawal"
        target="_blank"
        rel="noreferrer"
        className="social-link-btn"
      >
        <FaGithub size={16} />
      </motion.a>
      <motion.a
        {...hoverSpring}
        href="https://linkedin.com/in/adityaxrawal"
        target="_blank"
        rel="noreferrer"
        className="social-link-btn"
      >
        <FaLinkedinIn size={16} />
      </motion.a>
      <motion.a
        {...hoverSpring}
        href="mailto:contact@adityarawal.dev"
        className="social-link-btn"
      >
        <Mail size={16} />
      </motion.a>
    </div>
  </div>
);

const DeploymentBlock = () => (
  <div className="deployment-container">
    <div className="bottom-block-title">
      LAST DEPLOYMENT <ArrowUpRight size={12} color="#9A9A9A" />
    </div>
    <div className="deployment-date">
      May 20, 2026 <span>·</span> 11:42 AM IST
    </div>
    <div style={{ marginTop: '8px' }}>
      <ProjectSparkline
        data={[35, 55, 25, 65, 40, 80, 50, 90, 60, 85, 70, 100]}
        color="#3ED45A"
        width={180}
        height={32}
      />
    </div>
  </div>
);

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="footer-v3-root">
        {/* Section A — Hero Contact & World Map */}
        <div className="footer-hero-container">
          <motion.div
            className="footer-hero-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionLabel />
            <Headline />
            <Subtitle />
            <CTARow onOpenContact={() => setIsModalOpen(true)} />
          </motion.div>

          <div className="footer-map-container">
            <WorldMap />
          </div>
        </div>

        {/* Section B — Service Capability Cards */}
        <motion.div
          className="footer-services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '50px' }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerChild}>
            <ServiceCard
              icon={User2}
              iconBg="#F0EDE8"
              iconColor="#555555"
              title="Product\nEngineering"
              titleMobile="Product Eng."
              description="Building for impact"
            />
          </motion.div>
          <motion.div variants={staggerChild}>
            <ServiceCard
              icon={Code2}
              iconBg="#E8FFD6"
              iconColor="#3ED45A"
              title="Frontend\nSystems"
              titleMobile="Frontend Sys."
              description="Scalable interfaces"
            />
          </motion.div>
          <motion.div variants={staggerChild}>
            <ServiceCard
              icon={Cloud}
              iconBg="#F0EEFF"
              iconColor="#8B7CF6"
              title="Scalable\nBackends"
              titleMobile="Scalable Backends"
              description="Reliable & secure"
            />
          </motion.div>
          <motion.div variants={staggerChild}>
            <ServiceCard
              icon={Database}
              iconBg="#F0EEFF"
              iconColor="#8B7CF6"
              title="Data-driven\nProducts"
              titleMobile="Data Products"
              description="Insights that matter"
            />
          </motion.div>
          <motion.div variants={staggerChild} className="system-status-wrapper">
            <SystemStatusCard />
          </motion.div>
        </motion.div>

        {/* Section C — Bottom Bar */}
        <motion.div
          className="footer-bottom-bar"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '50px' }}
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.35,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <div className="footer-bottom-block-left">
            <CopyrightBlock />
            <BuiltWithBlock />
          </div>
          <div className="footer-bottom-block-right">
            <NetworkBlock />
            <DeploymentBlock />
          </div>
        </motion.div>
      </footer>
      {typeof document !== 'undefined' &&
        createPortal(
          <ContactInfo
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />,
          document.body,
        )}
    </>
  );
};

export default Footer;
