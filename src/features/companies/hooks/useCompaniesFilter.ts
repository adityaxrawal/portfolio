import { useMemo, useState } from 'react';

import { companiesData } from '../constants/companiesList';
import type { Company } from '../types';

const DISPLAY_LIMIT = 100;

export function useCompaniesFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = useMemo(() => {
    const flatList = companiesData.flat();
    if (!searchTerm) return flatList.slice(0, DISPLAY_LIMIT);
    return flatList
      .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, DISPLAY_LIMIT);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredCompanies: filteredCompanies as Company[],
    displayLimit: DISPLAY_LIMIT,
  };
}
