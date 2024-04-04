import { pollFor } from 'quais-polling';
import { quais } from 'quais';
import ERC721 from '../../contracts/ERC721.json';

// ----- functions from public mint ----- //
export const mintMiner = async (web3provider: any, rpcProvider: any, contractAddress: string) => {
  try {
    const contract = new quais.Contract(contractAddress, ERC721.abi, web3provider.getSigner());
    const tx = await contract.batchMint({ value: quais.utils.parseEther('50') });
    await pollFor(rpcProvider, 'getTransactionReceipt', [tx.hash], 1.5, 1);
    return Promise.resolve(tx);
  } catch (e) {
    console.log(JSON.parse(JSON.stringify(e)));
    return Promise.reject(JSON.parse(JSON.stringify(e)));
  }
};

export const checkMinted = async (provider: any, contractAddress: string, address: string) => {
  try {
    const contract = new quais.Contract(contractAddress, ERC721.abi, provider);
    const minted = await contract.hasMintedFullQuota(address);
    return Promise.resolve(minted);
  } catch (e) {
    console.log(e);
    return Promise.reject(JSON.parse(JSON.stringify(e)));
  }
};

// ----- functions from whitelist minting ----- //
// export const mintMinerWhitelist = async (web3provider: any, rpcProvider: any, contractAddress: string) => {
//   try {
//     const contract = new quais.Contract(contractAddress, ERC721.abi, web3provider.getSigner());
//     const tx = await contract.batchMint();
//     const receipt = await pollFor(rpcProvider, 'getTransactionReceipt', [tx.hash], 1.5, 1);
//     return Promise.resolve(tx);
//   } catch (e) {
//     console.log(JSON.parse(JSON.stringify(e)));
//     return Promise.reject(JSON.parse(JSON.stringify(e)));
//   }
// };

// ----- functions from verify address ownership ----- //
// export const verifyAddressOwnership = async (provider: any, address: string) => {
//   try {
//     const signer = provider.web3.getSigner();
//     const message = `My C1 Address: ${address}`;
//     const signature = await signer.signMessage(message);
//     return Promise.resolve({ message, signature });
//   } catch (e) {
//     return Promise.reject(JSON.stringify(e));
//   }
// };

// export const sendSignature = async (message: string, provider: provider, splitSig: any, contractAddress: string) => {
//   try {
//     const contract = new quais.Contract(contractAddress, VerifyAddress.abi, provider.web3.getSigner());
//     const tx = await contract.submitMessage(message, splitSig.v, splitSig.r, splitSig.s);
//     const receipt = await pollFor(provider.rpc, 'getTransactionReceipt', [tx.hash], 1.5, 1);
//     return Promise.resolve(tx);
//   } catch (e) {
//     console.log(JSON.parse(JSON.stringify(e)));
//     return Promise.reject(JSON.parse(JSON.stringify(e)));
//   }
// };
