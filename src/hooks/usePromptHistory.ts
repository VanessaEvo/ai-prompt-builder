import { useState, useMemo, useEffect } from 'react';
import type { SavedPrompt } from '../types/prompt';

export function usePromptHistory(prompts: SavedPrompt[]) {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredAndSortedPrompts = useMemo(() => {
    let result = [...prompts];

    if (filterFavorites) {
      result = result.filter(p => p.is_favorite);
    }

    if (debouncedQuery.trim()) {
      const lowerQuery = debouncedQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(lowerQuery) || p.prompt.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return b.timestamp.getTime() - a.timestamp.getTime();
      } else if (sortBy === 'oldest') {
        return a.timestamp.getTime() - b.timestamp.getTime();
      } else if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [prompts, debouncedQuery, sortBy, filterFavorites]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedPrompts.length / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPrompts = useMemo(() => {
    const start = (validCurrentPage - 1) * pageSize;
    return filteredAndSortedPrompts.slice(start, start + pageSize);
  }, [filteredAndSortedPrompts, validCurrentPage, pageSize]);

  return {
    searchQuery: searchInput,
    setSearchQuery: setSearchInput,
    sortBy,
    setSortBy,
    filterFavorites,
    setFilterFavorites,
    currentPage: validCurrentPage,
    setCurrentPage,
    totalPages,
    paginatedPrompts,
  };
}
