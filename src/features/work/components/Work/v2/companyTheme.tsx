import { FlaskConical } from 'lucide-react';

import type { CompanyThemeDetails } from '../../../types/work.types';

export function getCompanyDetails(companyName: string): CompanyThemeDetails {
  switch (companyName) {
    case 'MathCo':
      return {
        icon: (
          <span className="font-serif text-[#F0ECD8] font-bold text-xl md:text-2xl pt-1">
            M
          </span>
        ),
        badgeText: 'LIVE >',
        badgeClass: 'mc-badge-live',
        numColorClass: 'mc-num-live',
        activeBgClass: 'mc-card-active-live',
        indicatorClass: 'mc-indicator-live',
      };
    case 'Leadsquared':
      return {
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F0ECD8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path d="M9 21H3V15" />
            <path d="M10 14L21 3" />
            <path d="M16 3H21V8" />
          </svg>
        ),
        badgeText: 'SCALED',
        badgeClass: 'mc-badge-scaled',
        numColorClass: 'mc-num-scaled',
        activeBgClass: 'mc-card-active-scaled',
        indicatorClass: 'mc-indicator-scaled',
      };
    case 'DevelUp':
      return {
        icon: <FlaskConical size={22} color="#F0ECD8" strokeWidth={2} />,
        badgeText: 'LEARNING',
        badgeClass: 'mc-badge-learning-blue',
        numColorClass: 'mc-num-learning-blue',
        activeBgClass: 'mc-card-active-learning-blue',
        indicatorClass: 'mc-indicator-learning-blue',
      };
    case 'Wipro':
      return {
        icon: (
          <span className="text-[#F0ECD8] font-bold text-[12px] md:text-[14px] tracking-wide">
            wipro
          </span>
        ),
        badgeText: 'LEARNING',
        badgeClass: 'mc-badge-learning-purple',
        numColorClass: 'mc-num-learning-purple',
        activeBgClass: 'mc-card-active-learning-purple',
        indicatorClass: 'mc-indicator-learning-purple',
      };
    default:
      return {
        icon: <span className="text-[#F0ECD8] font-bold">?</span>,
        badgeText: 'PAST',
        badgeClass: 'mc-badge-past',
        numColorClass: 'mc-num-past',
        activeBgClass: '',
        indicatorClass: '',
      };
  }
}
