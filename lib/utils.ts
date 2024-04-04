import { quais } from 'quais';
import { whitelist } from './constants/whitelist/whitelist';

// ---- data ---- //
export const sortedQuaiShardNames: ShardNames = {
  'zone-0-0': { name: 'Cyprus-1', rpcName: 'cyprus1' },
  'zone-0-1': { name: 'Cyprus-2', rpcName: 'cyprus2' },
  'zone-0-2': { name: 'Cyprus-3', rpcName: 'cyprus3' },
  'zone-1-0': { name: 'Paxos-1', rpcName: 'paxos1' },
  'zone-1-1': { name: 'Paxos-2', rpcName: 'paxos2' },
  'zone-1-2': { name: 'Paxos-3', rpcName: 'paxos3' },
  'zone-2-0': { name: 'Hydra-1', rpcName: 'hydra1' },
  'zone-2-1': { name: 'Hydra-2', rpcName: 'hydra2' },
  'zone-2-2': { name: 'Hydra-3', rpcName: 'hydra3' },
};

// ---- explorer url builders ---- //
export const buildRpcUrl = (shardName: string) => {
  return `https://rpc.${shardName}.colosseum.quaiscan.io/`;
};

export const buildCyprus1Url = () => {
  return `https://cyprus1.colosseum.quaiscan.io`;
};

export const buildExplorerUrl = (shardName: string) => {
  return `https://${shardName}.colosseum.quaiscan.io`;
};

export const buildAddressUrl = (shardName: string, address: string) => {
  return `https://${shardName}.colosseum.quaiscan.io/address/${address}`;
};

export const buildTransactionUrl = (shardName: string, txHash: string) => {
  return `https://${shardName}.colosseum.quaiscan.io/tx/${txHash}`;
};

// ---- dispatchers ---- //
export const dispatchAccount = (accounts: Array<string> | undefined, dispatch: any) => {
  if (accounts?.length !== 0 && accounts !== undefined) {
    const shard = quais.utils.getShardFromAddress(accounts[0]);
    const account = {
      addr: accounts[0],
      shard: sortedQuaiShardNames[shard],
    };
    const WL = isAddressWhitelisted(account);
    dispatch({ type: 'SET_ACCOUNT', payload: account });
    dispatch({ type: 'SET_WHITELISTED', payload: WL });
  } else {
    dispatch({ type: 'SET_ACCOUNT', payload: undefined });
  }
};

// ---- utils ---- //
export const isAddressWhitelisted = (account: account) => {
  if (account) {
    const address = account.addr.toLowerCase();
    const list = Object.keys(whitelist);
    return list.includes(address);
  }
  return false;
};

export const shortenAddress = (address: string) => {
  if (address === '') return '';
  return address.slice(0, 5) + '...' + address.slice(-4);
};
