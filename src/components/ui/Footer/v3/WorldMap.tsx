import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { geoMercator, geoPath } from 'd3-geo';
import worldData from './world.json';

import './Footer.css'

const MapWidth = 1000;
const MapHeight = 450;

export const WorldMap = () => {
  const projection = useMemo(() => {
    return geoMercator()
      .scale(100)
      .translate([MapWidth / 2.5, MapHeight / 1.5]);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  // Cities coordinates [longitude, latitude]
  const cities = [
    { name: 'New York', coords: [-74.0060, 40.7128] },
    { name: 'São Paulo', coords: [-46.6333, -23.5505] },
    { name: 'London', coords: [-0.1276, 51.5072] },
    { name: 'Singapore', coords: [103.8198, 1.3521] },
  ];

  const bengaluruCoords = [77.5946, 12.9716];
  const [bengaluruX, bengaluruY] = projection(bengaluruCoords as [number, number]) || [0, 0];

  return (
    <div className="world-map-wrapper">
      <div className="world-map-svg-container">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${MapWidth} ${MapHeight}`} 
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="var(--color-border-strong)" />
            </pattern>
          </defs>
          <g>
            {(worldData as any).features.map((feature: any, i: number) => {
              if (feature.properties.name === "Antarctica") return null;
              
              return (
                <motion.path
                  key={`path-${i}`}
                  d={pathGenerator(feature) || ""}
                  fill="url(#dot-pattern)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.005 }}
                />
              );
            })}
          </g>

          {/* City Marker Dots */}
          {cities.map((city, i) => {
            const [x, y] = projection(city.coords as [number, number]) || [0, 0];
            return (
              <motion.circle 
                key={`city-${i}`} 
                cx={x} 
                cy={y} 
                r="3" 
                fill="var(--color-text-primary)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              />
            );
          })}
        </svg>
        
        {/* Bengaluru Main Location Dot with pulse */}
        <div 
          className="location-pin-wrapper" 
          style={{ 
            left: `${(bengaluruX / MapWidth) * 100}%`, 
            top: `${(bengaluruY / MapHeight) * 100}%`, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          <div className="location-pin-core" />
          <div className="location-ring" />
        </div>

        {/* Location Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="location-card"
          style={{ 
            left: `${(bengaluruX / MapWidth) * 90}%`, 
            top: `${(bengaluruY / MapHeight) * 110}%`,
            transform: 'translate(-10%, 20px)' 
          }}
        >
          <div className="location-card-row1">
            <span className="location-card-city">Bengaluru, India</span>
          </div>
          <div className="location-card-timezone">
            GMT +5:30
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorldMap;
