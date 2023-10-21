// Verification Key Hash: c03a816ed87d56d939b460aa62cdf5619d053fedc20aec5b1436f0dd77101509
// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec
pragma solidity >=0.8.4;

library UltraVerificationKey {
    function verificationKeyHash() internal pure returns(bytes32) {
        return 0x1bb22bb91f5f18131132bd774e7b641023e38d0e20147fd7288372d9e5733054;
    }

    function loadVerificationKey(uint256 _vk, uint256 _omegaInverseLoc) internal pure {
        assembly {
            mstore(add(_vk, 0x00), 0x0000000000000000000000000000000000000000000000000000000000008000) // vk.circuit_size
            mstore(add(_vk, 0x20), 0x000000000000000000000000000000000000000000000000000000000000001c) // vk.num_inputs
            mstore(add(_vk, 0x40), 0x2d1ba66f5941dc91017171fa69ec2bd0022a2a2d4115a009a93458fd4e26ecfb) // vk.work_root
            mstore(add(_vk, 0x60), 0x3063edaa444bddc677fcd515f614555a777997e0a9287d1e62bf6dd004d82001) // vk.domain_inverse
            mstore(add(_vk, 0x80), 0x0f5ef492022dc7b57fa918d991b8da96ecba7c45fad86fb40d6742597b05c2b4) // vk.Q1.x
            mstore(add(_vk, 0xa0), 0x0dce515db9e32a9b0d5de56ee1e109abdd999e6e1b8cffad9ab490ad6813fbf2) // vk.Q1.y
            mstore(add(_vk, 0xc0), 0x0a9db408174525c12b92c99d8d485c69998c12086c0922f9d3a3b90f41257b93) // vk.Q2.x
            mstore(add(_vk, 0xe0), 0x15d1ba7959243103d99fb2e093d1f6013eb79179d6940f751cfd1ec708454c87) // vk.Q2.y
            mstore(add(_vk, 0x100), 0x2daaa0f6b2ff8e4dab1af60e1d9ca7ed3d80132779997d86fd8e4ff8942950b4) // vk.Q3.x
            mstore(add(_vk, 0x120), 0x01c22bba6f31563a99dbcd6f4d87bda6dd2e756447e4e098054cb529b7c01687) // vk.Q3.y
            mstore(add(_vk, 0x140), 0x19feac28a5a7fde0ad4cecc33706490d4af51561472ac727e4bcb9e98be9ab80) // vk.Q4.x
            mstore(add(_vk, 0x160), 0x227c3ad648e5945c9a4a1821bd22c3e765a2508a82c3b4734d7767c4be6b14ac) // vk.Q4.y
            mstore(add(_vk, 0x180), 0x1a91f98711c7529d89dc8083380c82c02b7af7135d737b481e2d9bb225f2fd05) // vk.Q_M.x
            mstore(add(_vk, 0x1a0), 0x1c4819312c98fdce0851c81e76938f3b60b1755d7a9c60d9a1968a7025cb2962) // vk.Q_M.y
            mstore(add(_vk, 0x1c0), 0x1a3cfa8a6f53d8074219c50efbca43f547bec0a117aa9402d4fb1695e5d70890) // vk.Q_C.x
            mstore(add(_vk, 0x1e0), 0x1660d500066ed29017e8d1acec7c97c5e0600e9e95a3a41501c2e5e4d0dd1236) // vk.Q_C.y
            mstore(add(_vk, 0x200), 0x1715639d5db3ef5a7ed86efd2bc4cc4dbfebff47ee7e4a6c24b3ad5557f023de) // vk.Q_ARITHMETIC.x
            mstore(add(_vk, 0x220), 0x0bb30bc5aa950bdfb09f9e897a93983fe48e5cf8918a94fa9bf6652342f2000b) // vk.Q_ARITHMETIC.y
            mstore(add(_vk, 0x240), 0x2edc6ae50f755dcfab77b0d579c6e276b4b94bdac21fcbd755550fa86f541322) // vk.QSORT.x
            mstore(add(_vk, 0x260), 0x00b780ed463283246e4c8e5d0a44e8e0edda984623931aef3c23e488f96655a1) // vk.QSORT.y
            mstore(add(_vk, 0x280), 0x21959276775cd4749236c8bf773a9b2403cecb45fbf70e6439f73d75442e8850) // vk.Q_ELLIPTIC.x
            mstore(add(_vk, 0x2a0), 0x017714509f01d1a9ee7ebaf4d50745e33a14150b4fe9850a27e44de56d88cb14) // vk.Q_ELLIPTIC.y
            mstore(add(_vk, 0x2c0), 0x2e76c4474fcb457db84fb273ccc10a4647a1a37444369f2f275bb74540f5e2d0) // vk.Q_AUX.x
            mstore(add(_vk, 0x2e0), 0x209035caddd02a78acd0ed617a85d782533bd142c6cad8e3338f3142b919c3a4) // vk.Q_AUX.y
            mstore(add(_vk, 0x300), 0x01f1f255e57131fdc19012ab790a1dd0cbdeac42daa1965bfe7a86251794f7bb) // vk.SIGMA1.x
            mstore(add(_vk, 0x320), 0x222fd6450337d94bbd5e82706c47f04011cd846fe36b3a24e8d5add1e6799838) // vk.SIGMA1.y
            mstore(add(_vk, 0x340), 0x19ef98641510032bb25626b5bd7d63dde61005d2549128b5377af48e98775578) // vk.SIGMA2.x
            mstore(add(_vk, 0x360), 0x2f6c2304cead8d2fa8e176b80fd0a0895e0338e5427bd9105b525009efe93e08) // vk.SIGMA2.y
            mstore(add(_vk, 0x380), 0x20d725466d758367e6bb06adb587424e1ecb76e10295a0f7a20d8990159a3819) // vk.SIGMA3.x
            mstore(add(_vk, 0x3a0), 0x08b751da7b45c9b17512345ea16ebc09938c841867457fddf7f41d23dad5c290) // vk.SIGMA3.y
            mstore(add(_vk, 0x3c0), 0x086b92edf25bf5b8cd97d7abae0a52a595eda7876a873f2496ac889d253affcf) // vk.SIGMA4.x
            mstore(add(_vk, 0x3e0), 0x0b51beaf1f930035dfcbc44d6ec9d9a4a0da750c157fe156aa9c955bb7a444ca) // vk.SIGMA4.y
            mstore(add(_vk, 0x400), 0x0c14de0a66a29fef89dd6b25fd3dad2c934048825338d32c9be06295d6895cd3) // vk.TABLE1.x
            mstore(add(_vk, 0x420), 0x27e139fd5f94a95aed910fc16c4497e04e258a714b90ff5b7cb6a25af764b552) // vk.TABLE1.y
            mstore(add(_vk, 0x440), 0x2d283760e83465149e358f2910d2515f4df4e281eb18f1ef89f9ad7e72bbf9bf) // vk.TABLE2.x
            mstore(add(_vk, 0x460), 0x1e7bc1bdd03c522b54abfc3879fea26bcda8b544a524e1ca08ef3d5c5f615c06) // vk.TABLE2.y
            mstore(add(_vk, 0x480), 0x26ac63c1f22adb0e7f8bbcb49f009546c50d24b1247a743a505416bd4bf12e27) // vk.TABLE3.x
            mstore(add(_vk, 0x4a0), 0x1542e08ee844541bb7f00b5d7e456b1454a0f66a8793e87ee99a04b4686631b1) // vk.TABLE3.y
            mstore(add(_vk, 0x4c0), 0x2c5519e9f4218e2873b91dacf2c455670a5bbbd72ce413230f8b88aea0b1cda8) // vk.TABLE4.x
            mstore(add(_vk, 0x4e0), 0x207960ab6d379cbcdd1ec8b7d562f474d2df14bcf4faa4346a82d4dcbba683dd) // vk.TABLE4.y
            mstore(add(_vk, 0x500), 0x254c7c79f29e6f05184889d52a7c01375832d53ea8dd60b93162a5805d715657) // vk.TABLE_TYPE.x
            mstore(add(_vk, 0x520), 0x23558713233600d8847c983db3c2771210aad83fc39e33f4821c4b483fe579c1) // vk.TABLE_TYPE.y
            mstore(add(_vk, 0x540), 0x1972ccb5724d2add96881b6c6de165d1553ff814171275d96f846b7aad67feb3) // vk.ID1.x
            mstore(add(_vk, 0x560), 0x2f4551e4e6b2b5ee8d932afc0f9827378db05174fe77b8436e66380dd032525f) // vk.ID1.y
            mstore(add(_vk, 0x580), 0x2385867aff32cee2c289ca841f4fb3f323e66115dee2507c1865f4138c1cb102) // vk.ID2.x
            mstore(add(_vk, 0x5a0), 0x2d265deca73ab1d781ff40aa34bebe5eb1abeadc05ec2f8af327d6404fb522c7) // vk.ID2.y
            mstore(add(_vk, 0x5c0), 0x302153b04f90cf4753b3e670d4ffe7f91922a384e734a80d943ed5c4a8e756c1) // vk.ID3.x
            mstore(add(_vk, 0x5e0), 0x01ee88a173b8db48198f37e485ee0ce0321d6449541ad0e3cb9e4103e8d372b5) // vk.ID3.y
            mstore(add(_vk, 0x600), 0x13b096471cdcb7f4f79880e46170942daad158224a22fd40ae491a6e34db1a4c) // vk.ID4.x
            mstore(add(_vk, 0x620), 0x1b46cac0c6e6ac78e2f7ec0bd83f04d75aa604bd2a9355a48e57df2a18c9e2d6) // vk.ID4.y
            mstore(add(_vk, 0x640), 0x00) // vk.contains_recursive_proof
            mstore(add(_vk, 0x660), 0) // vk.recursive_proof_public_input_indices
            mstore(add(_vk, 0x680), 0x260e01b251f6f1c7e7ff4e580791dee8ea51d87a358e038b4efe30fac09383c1) // vk.g2_x.X.c1
            mstore(add(_vk, 0x6a0), 0x0118c4d5b837bcc2bc89b5b398b5974e9f5944073b32078b7e231fec938883b0) // vk.g2_x.X.c0
            mstore(add(_vk, 0x6c0), 0x04fc6369f7110fe3d25156c1bb9a72859cf2a04641f99ba4ee413c80da6a5fe4) // vk.g2_x.Y.c1
            mstore(add(_vk, 0x6e0), 0x22febda3c0c0632a56475b4214e5615e11e6dd3f96e6cea2854a87d4dacc5e55) // vk.g2_x.Y.c0
            mstore(_omegaInverseLoc, 0x05d33766e4590b3722701b6f2fa43d0dc3f028424d384e68c92a742fb2dbc0b4) // vk.work_root_inverse
        }
    }
}
