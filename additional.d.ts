import { ExternalProvider } from 'quais';

declare global {
  // ---- global ---- //
  interface Window {
    ethereum?: ExternalProvider;
  }
  type provider = { web3: any | undefined; rpc: any | undefined };
  type account = { addr: string; shard: { name: PlainTextShardName; rpcName: RPCShardName } } | undefined;
  type NumericalShardName =
    | 'zone-0-0'
    | 'zone-0-1'
    | 'zone-0-2'
    | 'zone-1-0'
    | 'zone-1-1'
    | 'zone-1-2'
    | 'zone-2-0'
    | 'zone-2-1'
    | 'zone-2-2';

  type PlainTextShardName =
    | 'Cyprus-1'
    | 'Cyprus-2'
    | 'Cyprus-3'
    | 'Paxos-1'
    | 'Paxos-2'
    | 'Paxos-3'
    | 'Hydra-1'
    | 'Hydra-2'
    | 'Hydra-3';

  type RPCShardName =
    | 'cyprus1'
    | 'cyprus2'
    | 'cyprus3'
    | 'paxos1'
    | 'paxos2'
    | 'paxos3'
    | 'hydra1'
    | 'hydra2'
    | 'hydra3';

  // ---- data ---- //
  type ShardNames = {
    [key: string]: { name: PlainTextShardName; rpcName: RPCShardName };
  };

  // ---- page + component props ---- //
  interface BaseLayoutProps {
    children?: ReactNode;
  }
  interface FAQProps {
    question: string;
    answer: string;
    answer2?: string;
    answer3?: string;
    answer4?: string;
  }
}
