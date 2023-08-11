// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Enum.sol";
import "./SignatureDecoder.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface GnosisSafe {
    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation
    ) external returns (bool success);
}

contract GrantPaymentModule {
    IERC20 public usdcToken; // Declare the USDC token contract
    address usdcTokenAddress;

    string public constant NAME = "GRANTS Module";
    string public constant VERSION = "0.1.0";
    bytes32 public constant GRANT_TRANSFER_TYPEHASH =
        keccak256("Grant Transfer");
    bytes32 public constant DOMAIN_SEPARATOR_TYPEHASH =
        keccak256("Domain Separator");

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

    // do we need Safe -> Delegate -> Allowance ??
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

    modifier onlyDelegateOrOwner(address _granteeAddress) {
        require(
            msg.sender == grants[_granteeAddress].delegate ||
                msg.sender == owner,
            "Not authorized: must be current delegate or owner"
        );
        _;
    }

    constructor(address _usdcTokenAddress) {
        owner = msg.sender; // Set the contract deployer as the initial owner.
        usdcTokenAddress = _usdcTokenAddress;
        usdcToken = IERC20(usdcTokenAddress); // Initialize the USDC token contract
    }

    // do we need this????
    function addDelegates(address[] memory _delegates) public onlyOwner {
        for (uint i = 0; i < _delegates.length; i++) {
            approvedDelegates[_delegates[i]] = true;
        }
    }

    function setGrant(
        address _granteeAddress,
        address _delegate,
        uint96 _amount,
        uint96 _milestoneAmount,
        string memory _grantRefID
    ) public onlyApprovedDelegate(_delegate) {
        grants[_granteeAddress] = Grant({
            delegate: _delegate,
            amount: _amount,
            distributedAmount: 0,
            milestoneAmount: _milestoneAmount,
            reachedMilestoneAmount: 0,
            grantRefID: _grantRefID,
            nonce: 0
        });
    }

    function getGrant(
        address _granteeAddress
    ) public view returns (Grant memory) {
        return grants[_granteeAddress];
    }

    function updateGrantDelegate(
        address _granteeAddress,
        address _newDelegate
    ) public onlyDelegateOrOwner(_granteeAddress) {
        require(
            approvedDelegates[_newDelegate],
            "New delegate is not approved"
        );

        grants[_granteeAddress].delegate = _newDelegate;
    }

    function updateGrant(
        address _granteeAddress,
        uint96 _currentMilestone,
        address _delegate
    ) public onlyApprovedDelegate(_delegate) {
        Grant storage grant = grants[_granteeAddress];
        require(_delegate == grant.delegate, "Not authorized");
        if (grant.reachedMilestoneAmount != _currentMilestone) {
            grant.reachedMilestoneAmount = _currentMilestone;
        }
        if (grant.delegate != _delegate) {
            grant.delegate = _delegate;
        }
        executeMilestoneTransfer(_granteeAddress);
    }

    function executeMilestoneTransfer(address _granteeAddress) internal {
        Grant storage grant = grants[_granteeAddress];

        // Calculate the amount to transfer for the reached milestone.
        uint96 transferAmount = grant.amount / grant.milestoneAmount;

        // Ensure the contract has enough funds and the grant has not exceeded its limit.
        require(
            address(this).balance >= transferAmount,
            "Not enough funds in the contract"
        );
        require(
            grant.distributedAmount + transferAmount <= grant.amount,
            "Transfer exceeds grant limit"
        );

        // Transfer the funds.
        usdcToken.approve(msg.sender, transferAmount);
        usdcToken.transferFrom(msg.sender, _granteeAddress, transferAmount);
        // payable(_granteeAddress).transfer(transferAmount);

        // Update the distributed amount for the grant.
        grant.distributedAmount += transferAmount;
    }

    function deleteGrant(address _granteeAddress) public onlyOwner {
        delete grants[_granteeAddress];
    }
}
