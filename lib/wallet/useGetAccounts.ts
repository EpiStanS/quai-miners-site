import { useEffect, useContext } from 'react';
import { quais } from 'quais';
import { DispatchContext } from '@/store';
import { dispatchAccount } from '@/lib/utils';

const useGetAccounts = () => {
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    const rpcProvider = new quais.providers.JsonRpcProvider('https://rpc.cyprus1.colosseum.quaiscan.io/');
    dispatch({ type: 'SET_RPC_PROVIDER', payload: rpcProvider });
    const getAccounts = async (provider: any, accounts?: Array<string> | undefined) => {
      console.log('accounts: ', accounts);
      if (accounts?.length !== 0 && accounts !== undefined) {
        dispatchAccount(accounts, dispatch);
      } else {
        await provider
          .send('quai_accounts')
          .then((accounts: Array<string>) => {
            dispatchAccount(accounts, dispatch);
          })
          .catch((err: Error) => {
            console.log('Error getting accounts.', err);
          });
      }
    };

    if (!window.ethereum) {
      dispatch({ type: 'SET_PROVIDER', payload: { web3: undefined, rpc: undefined } });
      return;
    } else {
      let provider = window.ethereum;
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.find(async (p: any) => {
          if (p.isPelagus) provider = p;
        });
      }
      if (provider?.isPelagus) {
        const web3provider = new quais.providers.Web3Provider(provider);
        dispatch({ type: 'SET_WEB3_PROVIDER', payload: web3provider });
        getAccounts(web3provider);
        provider.on('accountsChanged', (accounts: Array<string> | undefined) => getAccounts(web3provider, accounts));
      } else {
        dispatch({ type: 'SET_WEB3_PROVIDER', payload: undefined });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useGetAccounts;
