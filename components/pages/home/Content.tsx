import { Text, Flex } from '@chakra-ui/react';
import { Button } from '@/components/ui';

const Content = () => {
  return (
    <Flex direction="column" gap={10}>
      <Flex direction="column" gap={3}>
        <Text variant={{ base: 'h2', md: 'h1' }} pb={1}>
          TRADE
        </Text>
        <Text variant="p2" w={{ base: '100%', md: '53%' }}>
          Quai Miners are now available for trading on QuaiMark.
        </Text>
        <Button
          variant="primary"
          size="md"
          href="https://www.quaimark.com/collection/65e55eb052267da091a60213"
          newTab={true}
        >
          Trade on QuaiMark
        </Button>
      </Flex>
      <Flex direction="column" gap={3}>
        <Text variant={{ base: 'h2', md: 'h1' }} pb={1}>
          MINT
        </Text>
        <Text variant="p2" w={{ base: '100%', md: '53%' }}>
          The Quai Miners public mint has ended,{' '}
          <span style={{ color: 'white', fontWeight: '600' }}>all 5000 miners have been minted by the community</span>.
        </Text>
      </Flex>
      <Flex direction="column" gap={3}>
        <Text variant={{ base: 'h2', md: 'h1' }} pb={1}>
          FOR THE MINERS
        </Text>
        <Text variant="p2" w={{ base: '100%', md: '53%' }}>
          <span style={{ color: 'white', fontWeight: '600' }}>Any miner who mined a block on the Iron Age</span> testnet
          prior to Jan. 18th, 2024, was eligible to mint a Quai Miner.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Content;
