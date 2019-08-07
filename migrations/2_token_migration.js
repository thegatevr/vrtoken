var VRToken = artifacts.require("./VRToken.sol");
require('openzeppelin-test-helpers/configure')({ web3 });
const{ singletons } = require('openzeppelin-test-helpers');

module.exports = async function(deployer, network, accounts) {
    if (network === 'development') {
        await singletons.ERC1820Registry(accounts[0]);
    }
    const _name = "VR Token";
    const _symbol = "VRT";
    const _totalSupply = 800000000;
    await deployer.deploy(VRToken, _name, _symbol, _totalSupply);
};
