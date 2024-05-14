// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^4.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract BlockRx is ERC20 {
    enum StakingPlan {
        Plan1,
        Plan2
    }

    uint256 public constant PLAN1_REWARD_PERCENTAGE = 1; // 1% reward for Plan1
    uint256 public constant PLAN1_DURATION = 10 seconds; // 10 seconds duration for Plan1
    uint256 public constant PLAN2_REWARD_PERCENTAGE = 3; // 3% reward for Plan2
    uint256 public constant PLAN2_DURATION = 15 seconds; // 15 seconds duration for Plan2

    struct Stake {
        uint256 amount;
        uint256 unlockTime;
        uint256 reward;
        StakingPlan plan;
    }

    mapping(address => Stake) public stakes;

    constructor()
        ERC20("BlockRx", "Rx")
        // Ownable(initialOwner)
        // ERC20Permit("BlockRx")
    {
        _mint(msg.sender, 40000 * 1 **decimals());
    }

    function stake(uint256 amount, StakingPlan plan) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Calculate reward amount based on staking plan
        uint256 reward;
        if (plan == StakingPlan.Plan1) {
            reward = (amount * PLAN1_REWARD_PERCENTAGE) / 100;
        } else if (plan == StakingPlan.Plan2) {
            reward = (amount * PLAN2_REWARD_PERCENTAGE) / 100;
        } else {
            revert("Invalid staking plan");
        }

        // Transfer tokens to contract (only staked amount)
        transfer(address(this), amount);

        // Update stake
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].unlockTime =
            block.timestamp +
            (plan == StakingPlan.Plan1 ? PLAN1_DURATION : PLAN2_DURATION);
        stakes[msg.sender].reward += reward;
        stakes[msg.sender].plan = plan;
    }

    function unstake(StakingPlan plan) external {
        require(stakes[msg.sender].amount > 0, "No stake exists");
        require(
            block.timestamp >= stakes[msg.sender].unlockTime,
            "Stake is still locked"
        );
        require(stakes[msg.sender].plan == plan, "Invalid staking plan");

        uint256 amount = stakes[msg.sender].amount;
        uint256 reward = stakes[msg.sender].reward;

        // Delete stake
        delete stakes[msg.sender];

        // Mint reward to user
        _mint(msg.sender, reward);

        // Transfer staked amount back to user
        transfer(msg.sender, amount);
    }

    function emergencyClaim(StakingPlan plan) external {
        require(stakes[msg.sender].amount > 0, "No stake exists");
        require(
            block.timestamp < stakes[msg.sender].unlockTime,
            "Stake duration is already completed"
        );
        require(stakes[msg.sender].plan == plan, "Invalid staking plan");

        uint256 amount = stakes[msg.sender].amount;

        // Delete stake
        delete stakes[msg.sender];

        // Transfer staked amount back to user
        transfer(msg.sender, amount);
    }

    function timeLeftToUnstake(address account) public view returns (uint256) {
        require(stakes[account].amount > 0, "No stake exists");

        uint256 unlockTime = stakes[account].unlockTime;
        if (block.timestamp >= unlockTime) {
            return 0; // Stake is already unlocked
        } else {
            return unlockTime - block.timestamp;
        }
    }

    // function mint(address to, uint256 amount) external onlyOwner {
    //     _mint(to, amount);
    // }
}

