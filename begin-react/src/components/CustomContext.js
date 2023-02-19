import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialLimits = [
  
];

function customReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.limit);
    case 'REMOVE':
      return state.filter(limit => limit.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const CustomStateContext = createContext();
const CustomDispatchContext = createContext();
const CustomNextIdContext = createContext();

export function CustomProvider({ children }) {
  const [state, dispatch] = useReducer(customReducer, initialLimits);
  const nextId = useRef(8);

  return (
    <CustomStateContext.Provider value={state}>
      <CustomDispatchContext.Provider value={dispatch}>
        <CustomNextIdContext.Provider value={nextId}>
          {children}
        </CustomNextIdContext.Provider>
      </CustomDispatchContext.Provider>
    </CustomStateContext.Provider>
  );
}

export function useCustomState() {
  const context = useContext(CustomStateContext);
  if (!context) {
    throw new Error('Cannot find CustomProvider');
  }
  return context;
}

export function useCustomDispatch() {
  const context = useContext(CustomDispatchContext);
  if (!context) {
    throw new Error('Cannot find CustomProvider');
  }
  return context;
}

export function useCustomNextId() {
  const context = useContext(CustomNextIdContext);
  if (!context) {
    throw new Error('Cannot find CustomProvider');
  }
  return context;
}