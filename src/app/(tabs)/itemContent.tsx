import React, { createContext, useState, useContext } from 'react';

type Product = {
  id: string;
  name: string;
  state: string;
  quantity: string;
};

type ItemContextType = {
  productList: Product[];
  addProduct: (name: string, state: string, quantity: string) => void;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};

export const ItemProvider: React.FC = ({ children }) => {
  const [productList, setProductList] = useState<Product[]>([]);

  const addProduct = (name: string, state: string, quantity: string) => {
    const newItem: Product = {
      id: Math.random().toString(),
      name,
      state,
      quantity,
    };

    setProductList([...productList, newItem]);
  };

  return (
    <ItemContext.Provider value={{ productList, addProduct }}>
      {children}
    </ItemContext.Provider>
  );
};
