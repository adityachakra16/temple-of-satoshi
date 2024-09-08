// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MapGenerationLLM.sol";

contract DeployMapGenerationLLM is Script {
    function run() external {
        vm.startBroadcast();

        // Replace with the initial Oracle address you intend to use
        address oracleAddress = 0x68EC9556830AD097D661Df2557FBCeC166a0A075;

        // address oracleAddress = 0x0352b37E5680E324E804B5A6e1AddF0A064E201D

        // Deploy the contract
        MapGenerationLLM mapGeneration = new MapGenerationLLM(oracleAddress);

        vm.stopBroadcast();
    }
}
