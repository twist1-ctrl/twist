import { useMemo, useState } from 'react';
import { IPost } from '../types/post';

export type SortOrder = 'newest' | 'oldest' | 'az' | 'za';

export interface PostFiltersState {
  selectedTag: string | null;
  searchQuery: string;
  sortOrder: SortOrder;
}

export function usePostFilters(allPosts: IPost[], initialSelectedTag: string | null = null) {
  const [filters, setFilters] = useState<PostFiltersState>({
    selectedTag: initialSelectedTag,
    searchQuery: '',
    sortOrder: 'newest',
  });

  const filteredPosts = useMemo(() => {
    let result = [...allPosts];

    if (filters.selectedTag) {
      result = result.filter((post) => post.tagIds?.includes(filters.selectedTag as string));
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter((post) => {
        const title = post.title.toLowerCase();
        const excerpt = post.excerpt?.toLowerCase() || '';
        return title.includes(q) || excerpt.includes(q);
      });
    }

    result.sort((a, b) => {
      switch (filters.sortOrder) {
        case 'newest':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case 'oldest':
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [allPosts, filters]);

  const setTag = (tag: string | null) => {
    setFilters((current) => ({ ...current, selectedTag: tag }));
  };

  const setSearch = (query: string) => {
    setFilters((current) => ({ ...current, searchQuery: query }));
  };

  const setSort = (sortOrder: SortOrder) => {
    setFilters((current) => ({ ...current, sortOrder }));
  };

  return {
    filters,
    filteredPosts,
    setTag,
    setSearch,
    setSort,
  };
}
