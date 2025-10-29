'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface FilterContextType {
  selectedCategory: string
  selectedFilters: string[]
  sortOption: string
  setSelectedCategory: (category: string) => void
  setSelectedFilters: (filters: string[] | ((prev: string[]) => string[])) => void
  setSortOption: (option: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [sortOption, setSortOption] = useState('recent')

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        selectedFilters,
        sortOption,
        setSelectedCategory,
        setSelectedFilters,
        setSortOption,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}

