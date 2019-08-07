const { expectEvent, singletons, constants } = require('openzeppelin-test-helpers');
const { ZERO_ADDRESS } = constants;

const VRToken = artifacts.require('VRToken');

contract('VRToken', function ([_, registryFunder, creator]) {
    beforeEach(async function () {
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.token = await VRToken.new({ from: creator });
    });

    it('has a name', async function () {
        (await this.token.name()).should.equal('VR Token');
    });

    it('has a symbol', async function () {
        (await this.token.symbol()).should.equal('VRT');
    });

    it('assigns the total supply to the creator', async function () {
        const totalSupply = await this.token.totalSupply();
        const creatorBalance = await this.token.balanceOf(creator);

        creatorBalance.should.be.bignumber.equal(totalSupply);

        await expectEvent.inConstruction(this.token, 'Transfer', {
            from: ZERO_ADDRESS,
            to: creator,
            value: totalSupply,
        });
    });
});
