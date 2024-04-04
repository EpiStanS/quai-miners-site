# quai-miner-site

quai-miner-site is a simple NFT minting site built on top of Quai Network using chakra-ui, nextjs, and quaisjs.

## Getting started

1. clone the repo
2. install dependencies `npm i`
3. run the dev server `npm run dev`

## Notes

- The `components` folder contains the main components of the site. (Navigation, page layouts, page components, and ui components)
- The `contracts` folder contains contracts and abis for two contracts:
  - `VerifySignature.sol` - Contract used for initial cross-chain verification of whitelisted addresses not in C1
  - `ERC721.sol` - Modified ERC721 contract used to deploy Quai Miner NFTs on Cyprus 1
- The `lib` folder contains the main logic and data for the site. (addresses, wallet logic, contract logic, and utils)
- The `pages` folder contains the main pages of the site. (Home, Mint, and Verify)
  - Mint has been hidden from the site until as the minting process has finished, but is still accessible via the `/mint` route.
