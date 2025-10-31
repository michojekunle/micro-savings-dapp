// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SavingsPool {
    struct Pool {
        string name;
        string description;
        uint256 target;
        address recipient;
        uint256 total;
        bool completed;
    }

    Pool public pool;
    mapping(address => uint256) public contributions;

    event PoolCreated(string name, uint256 target, address recipient);
    event Contributed(address indexed contributor, uint256 amount);
    event GoalReached(uint256 total, address recipient);

    constructor(
        string memory _name,
        string memory _desc,
        uint256 _target,
        address _recipient
    ) payable {
        pool = Pool(_name, _desc, _target, _recipient, 0, false);
        emit PoolCreated(_name, _target, _recipient);
    }

    function contribute() external payable {
        require(!pool.completed, "Goal reached");
        require(msg.value > 0, "Send RBTC");

        contributions[msg.sender] += msg.value;
        pool.total += msg.value;

        emit Contributed(msg.sender, msg.value);

        if (pool.total >= pool.target) {
            pool.completed = true;
            (bool sent, ) = pool.recipient.call{value: pool.total}("");
            require(sent, "Transfer failed");
            emit GoalReached(pool.total, pool.recipient);
        }
    }

    function getProgress()
        external
        view
        returns (uint256 total, uint256 target, bool completed)
    {
        return (pool.total, pool.target, pool.completed);
    }
}
