import React, { FC, createContext, useReducer, ReactNode } from 'react';

interface StateData {
  account: account;
  provider: provider;
  whitelisted: boolean;
  web3Provider: any;
  rpcProvider: any;
  isPelagusInstalled: boolean;
}

const typeStateMap = {
  SET_ACCOUNT: 'account',
  SET_PROVIDER: 'provider',
  SET_WHITELISTED: 'whitelisted',
  SET_WEB3_PROVIDER: 'web3Provider',
  SET_RPC_PROVIDER: 'rpcProvider',
  SET_IS_PELAGUS_INSTALLED: 'isPelagusInstalled',
};

const initialState: StateData = {
  account: undefined,
  provider: { web3: undefined, rpc: undefined },
  whitelisted: false,
  web3Provider: undefined,
  rpcProvider: undefined,
  isPelagusInstalled: false,
};

const reducer = (state: StateData, action: { type: keyof typeof typeStateMap; payload: any }) => {
  const stateName = typeStateMap[action.type];
  if (!stateName) {
    console.warn(`Unknown action type: ${action.type}`);
    return state;
  }
  return { ...state, [stateName]: action.payload };
};

const StateContext = createContext(initialState);
const DispatchContext = createContext<any>(null);

const StateProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { typeStateMap, StateContext, DispatchContext, StateProvider };
