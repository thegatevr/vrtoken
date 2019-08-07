var VRTCrowdsale = artifacts.require("./VRTCrowdsale.sol");
// require('openzeppelin-test-helpers/configure')({ web3 });
// const{ singletons } = require('openzeppelin-test-helpers');

module.exports = async function(deployer, network, accounts) {
    // if (network === 'development') {
    //     await singletons.ERC1820Registry(accounts[0]);
    // }
    const _rate = 1;
    const _walletAddress = "0x7D2511061a7CC659a2255ab58f1AF41947c1f9F1";
    const _holderWalletAddress = "0xAA516A49d436D192B352490d6bb5c719C48B7E79";
    const _tokenAddress = "0x25F0c1D6D39d853eF3448ed0C1fbb57f6CD1f1FE";
    const _cap = "";
    const _openningTime = "";
    const _closingTime = "";
    await deployer.deploy(VRTCrowdsale, _rate, _walletAddress, _holderWalletAddress, _tokenAddress, _cap, _openningTime, _closingTime);
};
