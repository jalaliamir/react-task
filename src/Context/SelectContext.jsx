import { createContext, useContext, useReducer } from 'react';

const SelectContext = createContext();

const SelectDispatchContext = createContext();

const initialState = {
  category: 'ALL',
  status: 'ALL',
  sort: 'lastest',
};

function selectReducer(state, action) {
  const { category, status, sort } = state;
  switch (action.type) {
    case 'status': {
      return { category, status: action.payload, sort };
    }
    case 'category': {
      return { category: action.payload, status, sort };
    }
    case 'sort': {
      return { category, status, sort: action.payload };
    }
    default:
      return { category, status, sort };
  }
}
export function SelectProvider({ children }) {
  const [state, dispatch] = useReducer(selectReducer, initialState);
  return (
    <SelectContext.Provider value={state}>
      <SelectDispatchContext.Provider value={dispatch}>{children}</SelectDispatchContext.Provider>
    </SelectContext.Provider>
  );
}

export function useSelectContext() {
  return useContext(SelectContext);
}
export function useSelectDispatchContext() {
  return useContext(SelectDispatchContext);
}
