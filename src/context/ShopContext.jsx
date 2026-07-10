import { createContext, useContext, useState, useEffect } from 'react';
import { useDebounce } from '../useDebounce';

const ShopContext = createContext();

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [appliedFilters, setAppliedFilters] = useState({
    category:'All',
    priceRange: [0, Infinity],
    colors: [],
  });

  return (
    <ShopContext.Provider
        value={{
            searchQuery,
            setSearchQuery,
            debouncedSearchQuery,
            appliedFilters,
            setAppliedFilters,
        }}
    >
        {children}
    </ShopContext.Provider>
  );
}