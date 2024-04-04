import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, VStack } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '@/components/ui';

const NavDrawer = ({ isOpen, onOpen, onClose, navLinks, navButtons }: any) => {
  return (
    <>
      <Button onClick={onOpen} display={{ base: 'block', md: 'none' }} size="md" variant="secondary">
        <GiHamburgerMenu size={20} />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay display={{ base: 'block', md: 'none' }} />
        <DrawerContent display={{ base: 'block', md: 'none' }} bg="brand.900">
          <DrawerBody fontFamily="__Silkscreen_80d06d">
            <VStack spacing="15px" pt={5}>
              {navButtons.map((item: any, key: any) => (
                <Button key={key} variant="link" size="md" href={item.link} newTab={false} onClick={onClose}>
                  {item.name}
                </Button>
              ))}
              {navLinks.map((item: any, key: any) => (
                <Button key={key} variant="link" size="md" href={item.link} newTab={true} onClick={onClose}>
                  {item.title}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
