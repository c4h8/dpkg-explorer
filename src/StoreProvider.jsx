import React from 'react';
import { actionTypes } from './actions';

export const storeContext = React.createContext();
export const dispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_PACKAGE_DATA: {
      return ({
        ...state,
        packageNames: action.packageNames,
        packageMap: action.packageMap
      })
    }
    default: {
      return state
    }
  }
}

function StoreProvider({ children }) {
  const [store, dispatch] = React.useReducer(reducer, {})

  return (
    <storeContext.Provider value={store}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </storeContext.Provider>
  )
}

export default StoreProvider;
