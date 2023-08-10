// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract GrantsModule {
    string public constant NAME = "GRANTS Module";
    string public constant VERSION = "0.1.0";
    bytes32 public constant GRANT_TRANSFER_TYPEHASH = keccak256("Grant Transfer");
    bytes32 public constant DOMAIN_SEPARATOR_TYPEHASH = keccak256("Domain Separator");

    struct Grant {
        address delegate;
        uint96 amount;
        uint96 distributedAmount;
        uint96 milestoneAmount;
        uint96 reachedMilestoneAmount;
        string grantRefID;
        uint16 nonce; // You mentioned you're unsure about the nonce. For now, I've added it.
    }

    address public owner; // contract owner/admin
    mapping(address => Grant) public grants;
    mapping(address => bool) public approvedDelegates;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: must be owner");
        _;
    }

    modifier onlyApprovedDelegate(address _delegate) {
        require(approvedDelegates[_delegate], "Not an approved delegate");
        _;
    }

    modifier onlyDelegateOrOwner(address _grantAddress) {
        require(
            msg.sender == grants[_grantAddress].delegate || msg.sender == owner,
            "Not authorized: must be current delegate or owner"
        );
        _;
    }

    constructor() {
        owner = msg.sender; // Set the contract deployer as the initial owner.
    }

    function addDelegates(address[] memory _delegates) public onlyOwner {
        for (uint i = 0; i < _delegates.length; i++) {
            approvedDelegates[_delegates[i]] = true;
        }
    }

    function setGrant(
        address _grantAddress,
        address _delegate,
        uint96 _amount,
        uint96 _milestoneAmount,
        string memory _grantRefID
    ) public onlyApprovedDelegate(_delegate) {
        grants[_grantAddress] = Grant({
            delegate: _delegate,
            amount: _amount,
            distributedAmount: 0,
            milestoneAmount: _milestoneAmount,
            reachedMilestoneAmount: 0,
            grantRefID: _grantRefID,
            nonce: 0
        });
    }

    function getGrant(address _grantAddress) public view returns (Grant memory) {
        return grants[_grantAddress];
    }

    function updateGrantDelegate(address _grantAddress, address _newDelegate) public onlyDelegateOrOwner(_grantAddress) {
        require(approvedDelegates[_newDelegate], "New delegate is not approved");
    
        grants[_grantAddress].delegate = _newDelegate;
    }

    function updateGrant(address _grantAddress, uint96 _currentMilestone, address _delegate) public onlyApprovedDelegate(_delegate) {
        Grant storage grant = grants[_grantAddress];
        require(_delegate == grant.delegate, "Not authorized");
        grant.reachedMilestoneAmount += _currentMilestone;
        grant.distributedAmount += _currentMilestone;
    }

    function executeMilestoneTransfer(address _grantAddress) public onlyDelegateOrOwner(_grantAddress) {
        Grant storage grant = grants[_grantAddress];
    
        require(approvedDelegates[grant.delegate], "Not an approved delegate");
        
        // Calculate the amount to transfer for the reached milestone.
        uint96 transferAmount = grant.milestoneAmount * grant.reachedMilestoneAmount;
        
        // Ensure the contract has enough funds and the grant has not exceeded its limit.
        require(address(this).balance >= transferAmount, "Not enough funds in the contract");
        require(grant.distributedAmount + transferAmount <= grant.amount, "Transfer exceeds grant limit");
        
        // Transfer the funds.
        payable(_grantAddress).transfer(transferAmount);
        
        // Update the distributed amount for the grant.
        grant.distributedAmount += transferAmount;
    }

    function deleteGrant(address _grantAddress) public onlyOwner {
        delete grants[_grantAddress];
    }
}
