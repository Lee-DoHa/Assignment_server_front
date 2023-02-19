import React, { useReducer, createContext, useContext } from 'react';


const initialLists = [
  {
    id: 1,
    limit_id: null,
    text: 'bat',
    done: false
  },
  {
    id: 2,
    limit_id: null,
    text: 'cmd',
    done: false
  },
  {
    id: 3,
    limit_id: null,
    text: 'com',
    done: false
  },
  {
    id: 4,
    limit_id: null,
    text: 'cpl',
    done: false
  },
  {
    id: 5,
    limit_id: null,
    text: 'exe',
    done: false
  },
  {
    id: 6,
    limit_id: null,
    text: 'scr',
    done: false
  },
  {
    id: 7,
    limit_id: null,
    text: 'js',
    done: false
  }
];

function fixedReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
        return state.map(todo =>
            todo.id === action.id ? { ...todo, done: !todo.done } : todo
          );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const FixedStateContext = createContext();
const FixedDispatchContext = createContext();

export function FixedProvider({ children }) {
  const [state, dispatch] = useReducer(fixedReducer, initialLists); 

  return (
    <FixedStateContext.Provider value={state}>
      <FixedDispatchContext.Provider value={dispatch}>
        {children}
      </FixedDispatchContext.Provider>
    </FixedStateContext.Provider>
  );
}

export function useFixedState() {
  return useContext(FixedStateContext);
}

export function useFixedDispatch() {
  return useContext(FixedDispatchContext);
}