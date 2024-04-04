import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const images = ['/items/25.png', '/items/47.png', '/items/61.png', '/items/72.png', '/items/87.png', '/items/100.png'];

const Hero = () => {
  return (
    <Flex pt="40px" maxW="100vw" direction="column" gap="10px">
      <Text variant="display">QUAI MINERS</Text>
      <Flex direction="column">
        <Text variant="p1">A collection of 5000 unique miners on Quai Network.</Text>
        <Text variant="p2" color="white" fontWeight="600">
          Built for miners by miners.
        </Text>
      </Flex>
      <Flex h="300px">
        <Marquee autoFill={true}>
          {images.map((image, index) => (
            <Box key={index} px="15px">
              <Image src={image} alt="logo" width={200} height={200} />
            </Box>
          ))}
        </Marquee>
      </Flex>
    </Flex>
  );
};

export default Hero;
