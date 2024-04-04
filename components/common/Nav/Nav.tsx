import { useContext } from 'react';
import { Flex, useDisclosure, Text } from '@chakra-ui/react';
import { DispatchContext, StateContext } from '@/store';
import requestAccounts from '@/lib/wallet/requestAccounts';
import useGetAccounts from '@/lib/wallet/useGetAccounts';
import Button from '@/components/ui/Button';
import { shortenAddress } from '@/lib/utils';
import Content from './Content';
import NavDrawer from './NavDrawer';

const NavButtonContent = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'FAQ',
    link: '/faq',
  },
];

const NavLinkContent = [
  {
    title: 'Marketplace',
    link: 'https://quaimark.com',
  },
  {
    title: 'Discord',
    link: 'https://discord.gg/e9xcwyPw6f',
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/quaiminers',
  },
];

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, web3Provider } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  useGetAccounts();

  const connectHandler = () => {
    requestAccounts(dispatch, web3Provider);
  };
  return (
    <Flex
      w="100%"
      p="15px"
      maxW="100%"
      position="fixed"
      maxH="70px"
      backdropFilter="blur(10px)"
      background="rgba(13,13,13,0.85)"
      justifyContent="space-between"
      zIndex={100}
    >
      <NavDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        navLinks={NavLinkContent}
        navButtons={NavButtonContent}
      />
      <Content navLinks={NavLinkContent} navButtons={NavButtonContent} />
      <Button variant="primary" size="md" onClick={connectHandler} disabled={!!account || !web3Provider}>
        {account ? (
          <Flex gap="10px">
            <Text variant="p2-bold">{account.shard.name}</Text>
            <Text>{shortenAddress(account.addr)}</Text>
          </Flex>
        ) : (
          <>{web3Provider ? 'Connect Wallet' : 'Install Pelagus'}</>
        )}
      </Button>
    </Flex>
  );
};

export default Nav;
