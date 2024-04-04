// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";

contract VerifySignature {
  // Define struct to hold message pairs
  struct MessagePair {
      string unsignedMessage;
      bytes32 signedMessageHash;
  }

  // Map address to message pair
  mapping(address => MessagePair) public messages;

  // Map address to boolean to check if address has submitted a message
  mapping(address => bool) public hasSubmitted;

  // Map address to boolean to check if address is allowed to submit a message
  mapping(address => bool) private allowedAddresses;

  // Array to keep track of addresses that have submitted messages
  address[] private submitters; 

  // Events
  event MessageVerifiedAndLogged(address indexed sender, string unsignedMessage, bytes32 signedMessageHash);
  event VerificationFailed(address indexed sender, string reason);

  modifier isAllowedAndNotSubmitted() {
      require(allowedAddresses[msg.sender], "Sender not allowed");
      require(!hasSubmitted[msg.sender], "Sender has already submitted a message");
      _;
  }

  // Pass whitelist array to constructor
  constructor(address[] memory _allowedAddresses) {
      for (uint i = 0; i < _allowedAddresses.length; i++) {
          allowedAddresses[_allowedAddresses[i]] = true;
      }
  }

  /*
  @dev Function to submit a message
  @param unsignedMessage The message that was signed
  @param v The recovery id
  @param r The r value of the signature
  @param s The s value of the signature

  @notice The function verifies the signature and logs the message if the signature is valid
  */
  function submitMessage(
      string calldata unsignedMessage,
      uint8 v,
      bytes32 r,
      bytes32 s
  ) external isAllowedAndNotSubmitted {
      string memory messageLength = Strings.toString(uint256(bytes(unsignedMessage).length));
      bytes32 signedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", messageLength, unsignedMessage));
      address signer = ecrecover(signedMessageHash, v, r, s);

      require(signer == msg.sender, "Signer does not match sender");

      messages[signer] = MessagePair(unsignedMessage, signedMessageHash);
      hasSubmitted[signer] = true;
      submitters.push(signer); // Track the address that has submitted a message

      emit MessageVerifiedAndLogged(signer, unsignedMessage, signedMessageHash);
  }

  /*
  @dev Returns all messages that have been submitted by addresses
  */

  function getAllMessages() external view returns (address[] memory, MessagePair[] memory)  {
      address[] memory senderAddresses = new address[](submitters.length);
      MessagePair[] memory pairs = new MessagePair[](submitters.length);

      for (uint i = 0; i < submitters.length; i++) {
          senderAddresses[i] = submitters[i];
          pairs[i] = messages[submitters[i]];
      }

      return (senderAddresses, pairs);
  }
}

