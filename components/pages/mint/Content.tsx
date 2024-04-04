import { Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '@/store';
import Cyprus1 from './Cyprus1';
import OtherShard from './OtherShard';

const Content = () => {
  const { account } = useContext(StateContext);
  const [shard, setShard] = useState<string | null>(null);
  useEffect(() => {
    if (account) {
      setShard(account.shard.rpcName);
    } else {
      setShard(null);
    }
  }, [account]);

  return (
    <Flex py="60px" maxW="100vw" direction="column" gap="10px" alignItems="center" justifyContent="center">
      {account ? (
        <>
          {shard === 'cyprus1' ? (
            <Flex>
              <Cyprus1 />
            </Flex>
          ) : (
            <Flex>
              <OtherShard />
            </Flex>
          )}
        </>
      ) : (
        <Text variant="h2">Connect a wallet to mint your miner.</Text>
      )}
    </Flex>
  );
};

export default Content;
