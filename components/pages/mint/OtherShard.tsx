import { Flex, Text } from '@chakra-ui/react';

const OtherShard = () => {
  return (
    <Flex py="60px" maxW="100vw" direction="column" gap="10px" alignItems="center" justifyContent="center">
      <Text variant="h2">{`THE QUAI MINERS COLLECTION IS NOW IN PUBLIC MINT`}</Text>
      <Text variant="p2" pt="30px">
        Connect with a <strong>Cyprus 1 Address</strong> to mint a miner.
      </Text>
    </Flex>
  );
};

export default OtherShard;
