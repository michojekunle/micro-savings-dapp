// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/SavingsPool.sol";

contract SavingsPoolTest is Test {
    SavingsPool pool;
    address contributor1 = address(0x1);
    address contributor2 = address(0x2);
    address recipient = address(0x3);

    string constant NAME = "Vacation Fund";
    string constant DESC = "Let's save for a trip!";
    uint256 constant TARGET = 5 ether;

    function setUp() public {
        pool = new SavingsPool(NAME, DESC, TARGET, recipient);
    }

    function test_InitialPoolSetup() public {
        (uint256 total, uint256 target, bool completed) = pool.getProgress();
        assertEq(target, TARGET);
        assertEq(total, 0);
        assertFalse(completed);
    }

    function test_ContributionUpdatesTotal() public {
        vm.deal(contributor1, 1 ether);

        vm.prank(contributor1);
        pool.contribute{value: 1 ether}();

        (uint256 total,,) = pool.getProgress();
        assertEq(total, 1 ether);
        assertEq(pool.contributions(contributor1), 1 ether);
    }

    function testCannotContributeZero() public {
        vm.expectRevert(bytes("Send RBTC"));
        pool.contribute{value: 0}();
    }

    function test_GoalReachedTransfersFunds() public {
        vm.deal(contributor1, TARGET);
        vm.prank(contributor1);

        uint256 beforeBal = recipient.balance;
        pool.contribute{value: TARGET}();

        (uint256 total,, bool completed) = pool.getProgress();
        assertEq(total, TARGET);
        assertTrue(completed);
        assertEq(recipient.balance - beforeBal, TARGET);
    }

    function test_NoContributionsAfterGoal() public {
        vm.deal(contributor1, TARGET);
        vm.prank(contributor1);
        pool.contribute{value: TARGET}();

        vm.deal(contributor2, 1 ether);
        vm.prank(contributor2);
        vm.expectRevert(bytes("Goal reached"));
        pool.contribute{value: 1 ether}();
    }
}
