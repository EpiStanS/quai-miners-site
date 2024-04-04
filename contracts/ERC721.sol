// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WhitelistMintERC721 is ERC721URIStorage, Ownable {
    using Strings for uint256;
    mapping(address => uint256) private _whitelistQuotas;
    mapping(address => uint256) private _mintedCount;
    bool public whitelistEnabled = true;
    string private _baseTokenURI;
    uint256 private _tokenIds;
    uint256 public constant MAX_TOKENS = 5000;
    uint256 public mintingFee = 50 ether;

    /**
     * @dev Constructor for the contract.
     * 
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     * @param whitelistedAddresses The addresses to whitelist.
     * @param quotas The quotas for each whitelisted address.
     * @param baseTokenURI The base token URI for the token.
     */
    constructor(
        string memory name,
        string memory symbol,
        address[] memory whitelistedAddresses,
        uint256[] memory quotas,
        string memory baseTokenURI,
        uint256[] memory reservedIds,
        address[] memory reservedAddresses 
    ) ERC721(name, symbol) Ownable(msg.sender) {
        require(whitelistedAddresses.length == quotas.length, "Mismatch between addresses and quotas");
        require(reservedIds.length == reservedAddresses.length, "Mismatch between reserved ids and addresses");
        _baseTokenURI = baseTokenURI;
        for (uint256 i = 0; i < whitelistedAddresses.length; i++) {
            _whitelistQuotas[whitelistedAddresses[i]] = quotas[i];
        }
        for (uint256 i = 0; i < reservedIds.length; i++) {
            _mint(reservedAddresses[i], reservedIds[i]);
        }
    }

    /**
     * @dev Mint tokens to the caller.
     * If whitelist is enabled, only whitelisted addresses can mint.
     * If whitelist is enabled and the caller has minted their full quota, the mint will fail.
     * 
     * If whitelist is disabled, anyone can mint a single token per mint call.
     */
    function batchMint() public payable {
        require(_tokenIds < MAX_TOKENS, "Max token limit reached.");
        require(!whitelistEnabled || !hasMintedFullQuota(msg.sender), "Mint reverted due to lack of whitelist or mint quota met.");
        uint256 numberOfTokens;
        if (whitelistEnabled && !hasMintedFullQuota(msg.sender)) {
            numberOfTokens = _whitelistQuotas[msg.sender] - _mintedCount[msg.sender];
        } else if (!whitelistEnabled) {
            require(msg.value >= mintingFee, "Insufficient minting fee supplied.");
            numberOfTokens = 1;
        } else {
            revert("No tokens eligible to mint.");
        }

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _mintTo(msg.sender);
        }
    }

    /**
     * @dev Override required by ERC721URIStorage to return the base token URI.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Override required by ERC721URIStorage to return the token URI.
     * Adds ".json" to the end of the token ID to match the expected format of the tokenURI.
     * Reverts if token does not exist.
     * 
     * @param tokenId The token ID to return the URI for.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(tokenId <= MAX_TOKENS, "Token ID out of range.");
        require(ownerOf(tokenId) != address(0), "Nonexistent token.");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

    /**
     * @dev Modify the minting fee.
     * 
     * @param newFee The desired new minting fee.
     */
    function setMintingFee(uint256 newFee) public onlyOwner {
        mintingFee = newFee;
    }

    /**
     * @dev Withdraw the contract balance to the owner.
     */
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Toggle the whitelist on or off. Defaults to on.
     */
    function toggleWhitelist() public onlyOwner {
        whitelistEnabled = !whitelistEnabled;
    }

    /**
     * @dev Checks if the caller has minted their full quota.
     * 
     * @param addr The address to check the quota for.
     */
    function hasMintedFullQuota(address addr) public view returns (bool) {
        if (_whitelistQuotas[addr] == 0) {
            return false;
        }
        return _mintedCount[addr] >= _whitelistQuotas[addr];
    }

    /**
     * @dev Mint a single token to the recipient and increment tokenId + mintedCount.
     * 
     * @param recipient The address to mint the token to.
     */
    function _mintTo(address recipient) private {
        require(_tokenIds < MAX_TOKENS, "Max token limit reached.");
        _tokenIds ++;
        while (isReserved(_tokenIds)) {
          _tokenIds++;
        }
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _mintedCount[recipient]++;
    }

    function mintReserved(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function isReserved(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }
}
