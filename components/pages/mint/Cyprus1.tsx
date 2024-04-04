/* eslint react/no-unescaped-entities: 0 */ // --> OFF
import { useContext, useState } from 'react';
import { Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { Button } from '@/components/ui';
import { StateContext } from '@/store';
import { mintMiner } from '@/lib/contract/interactions';
import { buildTransactionUrl } from '@/lib/utils';
import { quaiMinerAddress } from '@/lib/constants/contractAddresses';

const Cyprus1 = () => {
  const { account, web3Provider, rpcProvider } = useContext(StateContext);

  // useEffect(() => {
  //   if (whitelisted && account) {
  //     if (localStorage.getItem(`minted-${account.addr}`) === 'true') {
  //       setMinted(true);
  //       return;
  //     }
  //     setLoading(true);
  //     checkMinted(rpcProvider, quaiMinerAddress, account.addr)
  //       .then((result: boolean) => {
  //         setMinted(result);
  //         setLoading(false);
  //         localStorage.setItem(`minted-${account.addr}`, result.toString());
  //       })
  //       .catch(err => {
  //         console.log('Error checking if minted', err);
  //         setLoading(false);
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [whitelisted, account, web3Provider]);

  const toast = useToast();
  const handleClicked = async () => {
    toast.promise(mintMiner(web3Provider, rpcProvider, quaiMinerAddress), {
      loading: {
        title: 'Minting miners',
        description: '',
        position: 'top-right',
        containerStyle: { fontFamily: '__Silkscreen_80d06d' },
      },
      success: (tx: any) => ({
        containerStyle: { fontFamily: '__Silkscreen_80d06d' },
        title: 'Miners minted!',
        description: (
          <Flex direction="column" gap={2}>
            <Button
              variant="link"
              href={buildTransactionUrl(account!.shard.rpcName, tx.hash)}
              newTab={true}
              color="white"
              fontWeight="600"
            >
              View In Explorer
            </Button>
            <Text variant="p2">Visit QuaiMark to view your miners.</Text>
          </Flex>
        ),
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      }),
      error: (error: any) => ({
        containerStyle: { fontFamily: '__Silkscreen_80d06d' },
        title: 'Error',
        description: error.reason || error.message || 'An unknown error occurred',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      }),
    });
  };

  return (
    <Flex py="60px" maxW="100vw" direction="column" gap={10} justifyContent="center" alignItems="center">
      <Flex borderBottom="1px solid #414141">
        <Text variant="h2">QUAI MINERS ARE NOW IN PUBLIC MINT</Text>
      </Flex>
      <Text variant="p2" pt="30px">
        The mint fee per miner is 50 Quai. The public mint will run until all 5000 miners are minted. Happy Minting!
      </Text>
      <Button variant="primary" size="xl" onClick={handleClicked}>
        Mint Your Miners
      </Button>
    </Flex>
  );
};

export default Cyprus1;
