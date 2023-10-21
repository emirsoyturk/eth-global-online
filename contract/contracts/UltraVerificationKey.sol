// Verification Key Hash: c03a816ed87d56d939b460aa62cdf5619d053fedc20aec5b1436f0dd77101509
// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec
pragma solidity >=0.8.4;

library UltraVerificationKey {
    function verificationKeyHash() internal pure returns(bytes32) {
        return 0xffacb42be439c8833d1ea59fc13e861708d4e2c15e7c46d0aa962e9356548ad4;
    }

    function loadVerificationKey(uint256 _vk, uint256 _omegaInverseLoc) internal pure {
        assembly {
            mstore(add(_vk, 0x00), 0x0000000000000000000000000000000000000000000000000000000000020000) // vk.circuit_size
            mstore(add(_vk, 0x20), 0x0000000000000000000000000000000000000000000000000000000000000022) // vk.num_inputs
            mstore(add(_vk, 0x40), 0x1bf82deba7d74902c3708cc6e70e61f30512eca95655210e276e5858ce8f58e5) // vk.work_root
            mstore(add(_vk, 0x60), 0x30643640b9f82f90e83b698e5ea6179c7c05542e859533b48b9953a2f5360801) // vk.domain_inverse
            mstore(add(_vk, 0x80), 0x10c7cbc8da1d2695c09962130705c7fd9d73a40a892ffbe17cc4ffdbed06c924) // vk.Q1.x
            mstore(add(_vk, 0xa0), 0x11d67e2f3a12db5dba02106c39c8e6151e54cac341092fe31bed66727ee035ae) // vk.Q1.y
            mstore(add(_vk, 0xc0), 0x27c6b644c33142668988399d9f59481e513eadfbfaa23a47343b3bbc3dcf23a5) // vk.Q2.x
            mstore(add(_vk, 0xe0), 0x02d60d244205688f845129232241a1355aeea8ca980d83ae113a63d11c3eb532) // vk.Q2.y
            mstore(add(_vk, 0x100), 0x218a6e795a330bc808180e68f3f384e696f10d2633568ca6bf9f5c98b3153f32) // vk.Q3.x
            mstore(add(_vk, 0x120), 0x1c7555cdb7ae928cbe295dbba9af322ec92ce02f789ae760aceb177bde250402) // vk.Q3.y
            mstore(add(_vk, 0x140), 0x20e39c0ebbbce90180a80b78ac4d36c3ba69c3a0f14041211bdc741c98599004) // vk.Q4.x
            mstore(add(_vk, 0x160), 0x01342a331cb3e5dd6184c643a45050858b8d31c878ed9a7f6945362147aa7ced) // vk.Q4.y
            mstore(add(_vk, 0x180), 0x1f77d9492edb2e3ab9fbbf64da38d9458c188e5ba71f336cd42dc2f6eb7947cf) // vk.Q_M.x
            mstore(add(_vk, 0x1a0), 0x074c76dde42609389abf1d0e24647adfe8113d33445700d77365297011d62cdf) // vk.Q_M.y
            mstore(add(_vk, 0x1c0), 0x1bc2cce5b6559a84e0f04b1119bc91147fa878bc0fc6246399d65c2c94428f1a) // vk.Q_C.x
            mstore(add(_vk, 0x1e0), 0x15131743beaf5843cef896acdfc96a918c4041dce65e150980c31bd874ecad3e) // vk.Q_C.y
            mstore(add(_vk, 0x200), 0x2062f23bc8af274ca872c5790a88e9d6ee2566567b7ff6b33334b757c0475a82) // vk.Q_ARITHMETIC.x
            mstore(add(_vk, 0x220), 0x0f06d2a7487a063b202e96fab4e0ef8abbb014f469f1b5a2345143605b7ae08a) // vk.Q_ARITHMETIC.y
            mstore(add(_vk, 0x240), 0x153b85766da72c16b70d5a5521f254c6490b97116d644cd2a0a4738f7cfaddf4) // vk.QSORT.x
            mstore(add(_vk, 0x260), 0x15c68c495188f405c9c56d9a2f67477a386381bab9ca84b03c7752e5f80cba48) // vk.QSORT.y
            mstore(add(_vk, 0x280), 0x28b955aac4c043cbcfde06eee59b44363f96fe0a6fa93b0b36ef07fbe285d4c7) // vk.Q_ELLIPTIC.x
            mstore(add(_vk, 0x2a0), 0x16e1bbb0a7728dcb7696fdf3361b39510c6a4f83cc2159f5fc65ceb2be0599f9) // vk.Q_ELLIPTIC.y
            mstore(add(_vk, 0x2c0), 0x1414af76247139fa9e8fef8b393a3e03227ee3a6fedb1e55f5db82cb2352782a) // vk.Q_AUX.x
            mstore(add(_vk, 0x2e0), 0x2c7895a68d2fab5b2bce4d7703daebf9011e63d675bc6898c7f06087d6d83d99) // vk.Q_AUX.y
            mstore(add(_vk, 0x300), 0x181e49c5a7da7ba29a2caa8bbaf5eed5ad9d35c79afa4fce58732b543f68e9d7) // vk.SIGMA1.x
            mstore(add(_vk, 0x320), 0x1855e1555b42da7e86152d0e5871434078ac59d4b8269b563f34c0b990ac818e) // vk.SIGMA1.y
            mstore(add(_vk, 0x340), 0x1fee3d933e22d83b501d8de35c4d98d5a1ee9fae783f40a15d7e7bc5d18f01b2) // vk.SIGMA2.x
            mstore(add(_vk, 0x360), 0x1d009d280a4bdf95d3f7f02945530d30022bf2ad8ae51bdb75d088c096d24766) // vk.SIGMA2.y
            mstore(add(_vk, 0x380), 0x10d6d53c283b8be313d27bc5900a3d43afd104d172f15586d72c07dcd447c5b6) // vk.SIGMA3.x
            mstore(add(_vk, 0x3a0), 0x02f897f1457a15e15c5df07274aa3def630ea0244b653d516307db13afa02bc7) // vk.SIGMA3.y
            mstore(add(_vk, 0x3c0), 0x2c370d37293f97b260838dadfdb0dfb7e8090d4cddb231ce311d56cec20899b7) // vk.SIGMA4.x
            mstore(add(_vk, 0x3e0), 0x293eb12a3dabcafb50c03f905aec521bcda3abcd532b893d26535a98ee322747) // vk.SIGMA4.y
            mstore(add(_vk, 0x400), 0x28faa42b5c13a5e9927d13e54a2ed806854cd23c6662b320439aa3168beffe03) // vk.TABLE1.x
            mstore(add(_vk, 0x420), 0x1e5c18afa66b4c0d19473e0536e64f678c1b094d1b2eff1d7f499dc289efc084) // vk.TABLE1.y
            mstore(add(_vk, 0x440), 0x10a001251e9f3a9f283ff8f6bd14cba9c706f3c5040ec8ef10ff44988441251c) // vk.TABLE2.x
            mstore(add(_vk, 0x460), 0x12138fab93fce066ddb2f9be4eff97b0fe128a2a2c079f749b8452698cace8bf) // vk.TABLE2.y
            mstore(add(_vk, 0x480), 0x133738f359ce2e0f909a0b76a78c602e66e39c41d99f65bfea25f47998283ccd) // vk.TABLE3.x
            mstore(add(_vk, 0x4a0), 0x2dd03593caea05125f520c0d02a3bbbdc5519822ba0e0b00984c5a9281143a81) // vk.TABLE3.y
            mstore(add(_vk, 0x4c0), 0x09ec9b0aca4e9671903e0577f2a4efd36f7a58af0a5102f5a42e1b8061f62421) // vk.TABLE4.x
            mstore(add(_vk, 0x4e0), 0x15affeadf66c8428f4f44d2ebe66e9dc0f04215bef81efbbee166d3f4544feab) // vk.TABLE4.y
            mstore(add(_vk, 0x500), 0x1fd912d00da77afb70848e4442324157606f77f54ebc05d1a1a5fc2030836b13) // vk.TABLE_TYPE.x
            mstore(add(_vk, 0x520), 0x1b1c85cc22723d352d37c86cfd66d45e809a813b99a452fe452c7ae975de2286) // vk.TABLE_TYPE.y
            mstore(add(_vk, 0x540), 0x00674b8f80d28e65134510744452c37520096ad01842bef9e4ff2cbc623a41dd) // vk.ID1.x
            mstore(add(_vk, 0x560), 0x24b0d1a89e8570dd162302204848c50cfee85913c9bd7578e001693e4cef408d) // vk.ID1.y
            mstore(add(_vk, 0x580), 0x0c748e100079862a625d1f666a8f1a1e2038899ef8305ad186164cb464a704ef) // vk.ID2.x
            mstore(add(_vk, 0x5a0), 0x01ee0a561504fa6920cf4be5596bbc9e8001fd05206cf38a95dc7bf2f259f2c6) // vk.ID2.y
            mstore(add(_vk, 0x5c0), 0x033996e71df6c811049ec95ed1b3bf022461ca67e79eef19a203f1d934ee97ef) // vk.ID3.x
            mstore(add(_vk, 0x5e0), 0x065c4e01b5d02779cf6610e373d0fe264b6fe6738e3a5a48d19932c0715758a9) // vk.ID3.y
            mstore(add(_vk, 0x600), 0x2fa057693726823037143d6b27bd96e175bdf1ebe4f42c68ee275657adaa06b5) // vk.ID4.x
            mstore(add(_vk, 0x620), 0x255002ee2dbd2d79c33e04b0741217da3f62815609e32d1fade136525f86a0c1) // vk.ID4.y
            mstore(add(_vk, 0x640), 0x00) // vk.contains_recursive_proof
            mstore(add(_vk, 0x660), 0) // vk.recursive_proof_public_input_indices
            mstore(add(_vk, 0x680), 0x260e01b251f6f1c7e7ff4e580791dee8ea51d87a358e038b4efe30fac09383c1) // vk.g2_x.X.c1
            mstore(add(_vk, 0x6a0), 0x0118c4d5b837bcc2bc89b5b398b5974e9f5944073b32078b7e231fec938883b0) // vk.g2_x.X.c0
            mstore(add(_vk, 0x6c0), 0x04fc6369f7110fe3d25156c1bb9a72859cf2a04641f99ba4ee413c80da6a5fe4) // vk.g2_x.Y.c1
            mstore(add(_vk, 0x6e0), 0x22febda3c0c0632a56475b4214e5615e11e6dd3f96e6cea2854a87d4dacc5e55) // vk.g2_x.Y.c0
            mstore(_omegaInverseLoc, 0x244cf010c43ca87237d8b00bf9dd50c4c01c7f086bd4e8c920e75251d96f0d22) // vk.work_root_inverse
        }
    }
}
