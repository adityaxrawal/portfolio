import React, { useLayoutEffect, useRef, useState } from 'react';

import { architectureSections, workerCards } from './architectureData';
import './WiproArchitecture.css';

const BOARD_WIDTH = 1132;
const BOARD_HEIGHT = 486;

const WiproSection = ({ section }) => {
  const Logo = section.logo;
  const isIconRows = section.layout === 'iconRows';

  return (
    <article
      className={[
        'wipro-arch-section',
        `wipro-arch-section--${section.tone}`,
        section.wide ? 'wipro-arch-section--wide' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={section.title}
    >
      <header className="wipro-arch-section__header">
        <h3>{section.title}</h3>
      </header>

      <div className="wipro-arch-section__content">
        {!isIconRows && (
          <div
            className={`wipro-arch-logo wipro-arch-logo--${section.tone}`}
            aria-hidden="true"
          >
            <Logo />
          </div>
        )}

        <div
          className={
            isIconRows
              ? 'wipro-arch-items wipro-arch-items--icon'
              : 'wipro-arch-items'
          }
        >
          {section.items.map((item) => {
            const Icon = item.icon;

            return (
              <div className="wipro-arch-item" key={item.label}>
                {Icon && (
                  <span className="wipro-arch-item__icon" aria-hidden="true">
                    <Icon />
                  </span>
                )}
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

const FlowArrow = ({ dashed = false }) => (
  <div
    className={`wipro-arch-flow-arrow ${
      dashed ? 'wipro-arch-flow-arrow--dashed' : ''
    }`}
    aria-hidden="true"
  />
);

const WorkerCard = ({ worker }) => {
  const Icon = worker.icon;

  return (
    <div className="wipro-arch-worker-card">
      <span className="wipro-arch-worker-card__icon" aria-hidden="true">
        <Icon />
      </span>
      <span>{worker.label}</span>
    </div>
  );
};

export const WiproArchitecture = () => {
  const viewportRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    const updateScale = () => {
      const { width, height } = viewport.getBoundingClientRect();
      const nextScale = Math.min(width / BOARD_WIDTH, height / BOARD_HEIGHT, 1);
      setScale(Number(Math.max(nextScale, 0.25).toFixed(4)));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <section
      className="wipro-architecture"
      aria-label="Wipro e-commerce system architecture"
    >
      <div className="wipro-architecture__viewport" ref={viewportRef}>
        <div
          className="wipro-architecture__board"
          style={{ '--wipro-arch-scale': scale }}
          role="img"
          aria-label="Client Layer to Frontend Angular to API Gateway NGINX to Backend Services Node.js to Data Layer to External Services with Background Jobs and Workers below"
        >
          <div className="wipro-arch-top-flow">
            {architectureSections.map((section, index) => (
              <React.Fragment key={section.id}>
                <WiproSection section={section} />
                {index < architectureSections.length - 1 && (
                  <FlowArrow
                    dashed={
                      section.id === 'data' &&
                      architectureSections[index + 1]?.id === 'external'
                    }
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div
            className="wipro-arch-worker-connector wipro-arch-worker-connector--coupon"
            aria-hidden="true"
          >
            <span className="wipro-arch-worker-connector__segment wipro-arch-worker-connector__segment--source" />
            <span className="wipro-arch-worker-connector__segment wipro-arch-worker-connector__segment--bridge" />
            <span className="wipro-arch-worker-connector__segment wipro-arch-worker-connector__segment--target" />
          </div>
          <div
            className="wipro-arch-worker-connector wipro-arch-worker-connector--order"
            aria-hidden="true"
          />
          <div
            className="wipro-arch-worker-connector wipro-arch-worker-connector--data"
            aria-hidden="true"
          />

          <section
            className="wipro-arch-workers"
            aria-label="Background Jobs and Workers"
          >
            <h3>Background Jobs &amp; Workers</h3>
            <div className="wipro-arch-workers__grid">
              {workerCards.map((worker) => (
                <WorkerCard worker={worker} key={worker.label} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default WiproArchitecture;
