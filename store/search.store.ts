import { create } from 'zustand'

interface SearchState {
  query: string;
  category: string | null;
  module: 'all' | 'plant' | 'microorganism' | 'herbarium';
  setQuery: (q: string) => void;
  setCategory: (c: string | null) => void;
  setModule: (m: 'all' | 'plant' | 'microorganism' | 'herbarium') => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  category: null,
  module: 'all',
  setQuery: (q) => set({ query: q }),
  setCategory: (c) => set({ category: c }),
  setModule: (m) => set({ module: m }),
  resetSearch: () => set({ query: '', category: null, module: 'all' })
}))
