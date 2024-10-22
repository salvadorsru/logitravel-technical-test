import { createContext } from 'react';
import PropTypes from 'prop-types';
import useList from '@/hooks/useList';

export const ListContext = createContext();

export function ListProvider ({ children }) {
  const list = useList();

  return (
    <ListContext.Provider value={list}>
      {children}
    </ListContext.Provider>
  );
};

ListProvider.propTypes = {
    children: PropTypes.node
}