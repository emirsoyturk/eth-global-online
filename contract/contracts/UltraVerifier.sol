// Verification Key Hash: c03a816ed87d56d939b460aa62cdf5619d053fedc20aec5b1436f0dd77101509
// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec
pragma solidity >=0.8.4;

import "./BaseUltraVerifier.sol";

contract UltraVerifier is BaseUltraVerifier {
    function getVerificationKeyHash() public pure override(BaseUltraVerifier) returns (bytes32) {
        return UltraVerificationKey.verificationKeyHash();
    }

    function loadVerificationKey(uint256 vk, uint256 _omegaInverseLoc) internal pure virtual override(BaseUltraVerifier) {
        UltraVerificationKey.loadVerificationKey(vk, _omegaInverseLoc);
    }
}