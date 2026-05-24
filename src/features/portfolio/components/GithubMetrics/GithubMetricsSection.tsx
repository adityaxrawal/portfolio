import { motion, Variants } from 'framer-motion';
import {
  ExternalLink,
  Calendar,
  Star,
  Package,
  GitPullRequest,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaGithub as Github } from 'react-icons/fa6';

import { useSharedState } from '@/app';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import './GithubMetrics.css';

const GithubMetricsSection = () => {
  const { isDarkTheme } = useSharedState();
  const { stats, loading, error } = useGitHubStats({ reportError: true });

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  if (error) {
    return (
      <div
        className={`github-metrics-container ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}
      >
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <motion.section
      className={`github-metrics-container ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="metrics-header">
        <div className="metrics-title-wrapper">
          <h3 className="metrics-title">Behind The Code</h3>
        </div>
        <div className="metrics-subtitle-wrapper">
          <span className="metrics-subtitle">
            Building in public, one commit at a time
          </span>
          <a
            href="https://github.com/adityaxrawal"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View GitHub Profile"
          >
            <Github size={14} />
            <ExternalLink size={12} className="external-icon" />
          </a>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricBlock
          loading={loading}
          value={stats?.totalContributions}
          label="Contributions"
          subtitle="built consistently"
          icon={<Calendar size={18} strokeWidth={1.5} />}
          variants={itemVariants}
        />
        <MetricBlock
          loading={loading}
          value={stats?.totalStars}
          label="OSS Appreciation"
          subtitle="stars from developers"
          icon={<Star size={18} strokeWidth={1.5} />}
          variants={itemVariants}
        />
        <MetricBlock
          loading={loading}
          value={stats?.projectsShipped}
          label="Projects Shipped"
          subtitle="production-minded builds"
          icon={<Package size={18} strokeWidth={1.5} />}
          variants={itemVariants}
        />
        <MetricBlock
          loading={loading}
          value={stats?.pullRequests}
          label="Pull Requests"
          subtitle="merged & reviewed"
          icon={<GitPullRequest size={18} strokeWidth={1.5} />}
          variants={itemVariants}
        />
      </div>

      <div className="metrics-footer">
        <div className="live-indicator">
          <div className="indicator-dot" />
          <span>Updated live via GitHub GraphQL API</span>
        </div>
        {stats?.updatedAt && (
          <span className="timestamp">
            Last updated:{' '}
            {new Date(stats.updatedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>
    </motion.section>
  );
};

interface MetricBlockProps {
  loading: boolean;
  value?: number;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  variants: Variants;
}

const MetricBlock = ({
  loading,
  value,
  label,
  subtitle,
  icon,
  variants,
}: MetricBlockProps) => {
  return (
    <motion.div className="metric-block" variants={variants}>
      <div className="metric-icon-wrapper">{icon}</div>
      <div className="metric-value">
        {loading ? (
          <div className="skeleton-value" />
        ) : (
          <CountUp value={value || 0} />
        )}
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-desc">{subtitle}</div>
    </motion.div>
  );
};

const CountUp = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = value;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Easing function (outQuart)
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      const currentCount = Math.round(easedProgress * end);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
};

export default GithubMetricsSection;
