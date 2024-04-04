import { Flex, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex py="60px" maxW="100vw" direction="column" gap="10px" alignItems="center" justifyContent="center">
      <Text variant="display">MINT</Text>
    </Flex>
  );
};

export default Header;
