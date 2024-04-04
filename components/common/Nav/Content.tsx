import { HStack, Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react';
import { Button } from '@/components/ui';

const Content = ({ navLinks, navButtons }: any) => {
  return (
    <HStack spacing="15px" display={{ base: 'none', md: 'block' }}>
      {navButtons.map((item: any, key: any) => (
        <Button key={key} variant="phantom" size="md" href={item.link} newTab={false}>
          {item.name}
        </Button>
      ))}
      <Menu>
        <MenuButton as={Button} variant="phantom" size="md">
          Links
        </MenuButton>
        <MenuList bg="transparent" borderRadius="0px" borderColor="#313131">
          {navLinks.map((item: any, key: any) => (
            <MenuItem
              key={key}
              as={Button}
              variant="phantom"
              size="sm"
              href={item.link}
              newTab={true}
              bg="transparent"
              _hover={{ bg: 'transparent', border: 'none' }}
            >
              {item.title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Content;
