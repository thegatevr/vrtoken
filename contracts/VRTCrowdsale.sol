pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "openzeppelin-solidity/contracts/token/ERC777/IERC777Recipient.sol";
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/token/ERC777/IERC777.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/WhitelistCrowdsale.sol";

contract VRTCrowdsale is IERC777Recipient, Crowdsale, WhitelistCrowdsale//, CappedCrowdsale, TimedCrowdsale, AllowanceCrowdsale
{

    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("ERC777TokensRecipient");

    IERC777 private _token;

    constructor(
        uint256 rate,            // rate, in TKNbits
        address payable wallet,  // wallet to send Ether
        address holderWallet,    // wallet holding tokens
        address token,            // the token
        uint256 cap,             // total cap, in wei
        uint256 openingTime,     // opening time in unix epoch seconds
        uint256 closingTime      // closing time in unix epoch seconds
    )
    // CappedCrowdsale(cap)
    // TimedCrowdsale(openingTime, closingTime)
    // AllowanceCrowdsale(holderWallet)
    Crowdsale(rate, wallet, IERC20(token))
    public
    {
        _token = IERC777(token);
        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));
    }

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external {
        require(msg.sender == address(_token), "VRTCrowdsale: Invalid token");
    }
}
