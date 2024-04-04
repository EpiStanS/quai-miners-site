/* eslint react/no-unescaped-entities: 0 */ // --> OFF
import { Text, Flex } from '@chakra-ui/react';
import Button from '@/components/ui/Button';

const Content = () => {
  return (
    <Flex py="60px" maxW="100vw" direction="column" gap="50px" fontFamily="monospace">
      <Flex direction="column" gap={2}>
        <Text variant="h3" pb={2} borderBottom="1px solid #414141">
          WHAT IS QUAI MINERS?
        </Text>
        <Text variant="p2">
          Quai Miners is an collection of 5,000 randomly generated miners
          <strong> deployed on Cyprus-1 in the Quai Network Testnet</strong>. Quai Miners are single-chain NFTs that
          live on Cyprus 1.
        </Text>
      </Flex>
      <Flex direction="column" gap={2}>
        <Text variant="h3" pb={2} borderBottom="1px solid #414141">
          HOW DOES THIS MINT WORK?
        </Text>
        <Text variant="p2">
          <strong>The collection rollout consists of 2 phases: verification and minting.</strong>
        </Text>
        <Text variant="p2">
          There will be a <span style={{ color: 'white', fontWeight: '600' }}>VERIFICATION PERIOD</span> lasting for one
          week. During this period, non-Cyprus-1 addresses on the whitelist will{' '}
          <Button
            variant="link"
            size="md"
            href="/mint"
            newTab={false}
            color="white"
            fontWeight="600"
            textDecoration="underline"
          >
            provide and link their Cyprus 1 address
          </Button>{' '}
          to be used during the mint.{' '}
          <strong>The community whitelist will also be filled out during this registration period.</strong>
        </Text>
        <Text variant="p2">
          Following the registration period, there will be a{' '}
          <span style={{ color: 'white', fontWeight: '600' }}>CLAIM PERIOD</span> lasting for two weeks. During this
          period, all whitelisted addresses (whether via mining or community whitelist) will be eligible to claim.
        </Text>
      </Flex>
      <Flex direction="column" gap={2}>
        <Text variant="h3" pb={2} borderBottom="1px solid #414141">
          WHY DO I HAVE TO REGISTER MY ADDRESSES?
        </Text>
        <Text variant="p2">
          All of the Quai Miners NFTs are single chain NFTs on Cyprus 1, meaning they cannot be sent to or exist on any
          other shard. Minting single chain NFTs on Cyprus 1 keeps the collection simple and concise, but we recognize
          that Quai Miners were built for <strong>every single Iron Age Testnet miner</strong>, not just Cyprus-1
          miners.
        </Text>
        <Text variant="p2">
          In order to ensure miners from all chains can mint their Quai Miners, we need you to specify which Cyprus-1
          address you want to be able to mint your Quai Miners to. This allows us to both include miners from all chains
          and retain a simple single chain minting process.
        </Text>
      </Flex>
      <Flex direction="column" gap={2}>
        <Text variant="h3" pb={2} borderBottom="1px solid #414141">
          IF YOU'RE A QUAI MINER
        </Text>
        <Text variant="p2">
          <strong>
            A snapshot was taken on 1/18/24 of all addresses that have mined at least one block in any chain and used to
            build the miner whitelist.
          </strong>
        </Text>
        <Text variant="p2">
          You'll be eligible to mint a single Quai Miner per whitelisted Cyprus-1 address plus 1 additional Quai Miner
          for each non-Cyprus-1 address you linked and registered during the registration period. For example, if a Quai
          miner who has been mining on all 9 shards signed a message on each chain registering to the Cyprus-1 address,
          that Cyprus-1 address would be eligible to mint 9 total Quai Miners when the claim period begins.
        </Text>
      </Flex>
      <Flex direction="column" gap={2}>
        <Text variant="h3" pb={2} borderBottom="1px solid #414141">
          WHAT HAPPENS IF I DON'T REGISTER MY ADDRESSES?
        </Text>
        <Text variant="p2">
          <strong>
            Any non-Cyprus-1 addresses that fails to register their mint to a Cyprus-1 address during the registration
            period will forfeit their mint
          </strong>
          , which will be re-allocated to the dev wallet for marketing purposes.
        </Text>
      </Flex>
      <Flex direction="column" gap={2}>
        <Text variant="h3" pb={2} borderBottom="1px solid #414141">
          I MISSED THE SNAPSHOT, HOW CAN I GET A QUAI MINER?
        </Text>
        <Text variant="p2">
          The mining whitelist snapshot has already been taken, but there are still whitelist spots available through
          the community whitelist. Check out{' '}
          <Button
            variant="link"
            size="md"
            href="https://twitter.com/quaiminers"
            newTab={true}
            color="white"
            fontWeight="600"
            textDecoration="underline"
          >
            @quaiminers
          </Button>{' '}
          and{' '}
          <Button
            variant="link"
            size="md"
            href="https://twitter.com/basedpavel"
            newTab={true}
            color="white"
            fontWeight="600"
            textDecoration="underline"
          >
            @basedPavel
          </Button>{' '}
          on X/Twitter for the latest updates on how to be added to the community whitelist or visit the{' '}
          <Button
            variant="link"
            size="md"
            href="https://twitter.com/basedpavel"
            newTab={true}
            color="white"
            fontWeight="600"
            textDecoration="underline"
          >
            community whitelist form
          </Button>{' '}
          and add your address to be considered for a spot.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Content;
