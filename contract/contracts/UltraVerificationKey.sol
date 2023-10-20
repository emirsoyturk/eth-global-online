// Verification Key Hash: c03a816ed87d56d939b460aa62cdf5619d053fedc20aec5b1436f0dd77101509
// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec
pragma solidity >=0.8.4;

library UltraVerificationKey {
    function verificationKeyHash() internal pure returns(bytes32) {
        return 0xc03a816ed87d56d939b460aa62cdf5619d053fedc20aec5b1436f0dd77101509;
    }

    function loadVerificationKey(uint256 _vk, uint256 _omegaInverseLoc) internal pure {
        assembly {
            mstore(add(_vk, 0x00), 0x0000000000000000000000000000000000000000000000000000000000008000) // vk.circuit_size
            mstore(add(_vk, 0x20), 0x0000000000000000000000000000000000000000000000000000000000000001) // vk.num_inputs
            mstore(add(_vk, 0x40), 0x2d1ba66f5941dc91017171fa69ec2bd0022a2a2d4115a009a93458fd4e26ecfb) // vk.work_root
            mstore(add(_vk, 0x60), 0x3063edaa444bddc677fcd515f614555a777997e0a9287d1e62bf6dd004d82001) // vk.domain_inverse
            mstore(add(_vk, 0x80), 0x135d38b0af16d74e1b5386490d6d5823ec1aef40008cde4064131ac4309705ad) // vk.Q1.x
            mstore(add(_vk, 0xa0), 0x1f16916857ad185513d291e2de4d627ed698d8430efa43c219200ca615d2b14b) // vk.Q1.y
            mstore(add(_vk, 0xc0), 0x243ca72c4aa4c1d77ada6418d06787e117527f2264b64ff463db68340f484b47) // vk.Q2.x
            mstore(add(_vk, 0xe0), 0x196572566cc4d1b6c6761a9564363d5d8c5d2c3c94efd377e65cc8c81d6ff2cf) // vk.Q2.y
            mstore(add(_vk, 0x100), 0x07b914c187b111fd29387b9c324c4edf1b63b168fd964c19636f4b17aac1894e) // vk.Q3.x
            mstore(add(_vk, 0x120), 0x1594cb0913ee177b7a03008a1ede272b0407b7f56c9800b7b5186ecdb7844c54) // vk.Q3.y
            mstore(add(_vk, 0x140), 0x2c32367cd22c28368ba0bcbf8f99925afa151364164f8c34092374f5ec1f7e33) // vk.Q4.x
            mstore(add(_vk, 0x160), 0x177df06b15e049237f28eb291a7257fabe9bd76ee776d12d96dc8ed5f8972e8f) // vk.Q4.y
            mstore(add(_vk, 0x180), 0x2b390743e5a7d168d0be551711c197ac4abf10d7fcdf364093c13efb816b69bb) // vk.Q_M.x
            mstore(add(_vk, 0x1a0), 0x06889706b46725e539c7a0ff4759be589cc92e962dbba4659f3790199650f7d2) // vk.Q_M.y
            mstore(add(_vk, 0x1c0), 0x2458d8f972703850512768672379b324a6172a48e09ce977d7e5ecd6560a73f3) // vk.Q_C.x
            mstore(add(_vk, 0x1e0), 0x1598c25e1bdb7acff2f9835237fcc1770c69472232090e423e8088702ebf8347) // vk.Q_C.y
            mstore(add(_vk, 0x200), 0x20160b8cddb62c552abdea5b1198aa61345012be8ab5482ae68a500afbc63b08) // vk.Q_ARITHMETIC.x
            mstore(add(_vk, 0x220), 0x1038c190d440f11d969d352b56f1c8b8fe1cb4e2908dad804c896f4bef61e808) // vk.Q_ARITHMETIC.y
            mstore(add(_vk, 0x240), 0x1b926ead6e8acaa4e8f70b6ae3540f523c28f019971b33e570710aa63ca67344) // vk.QSORT.x
            mstore(add(_vk, 0x260), 0x0200c1b7f33f98d99952368110d97bc91154d3eaf0c2b57f4784bd97818ee4cb) // vk.QSORT.y
            mstore(add(_vk, 0x280), 0x21959276775cd4749236c8bf773a9b2403cecb45fbf70e6439f73d75442e8850) // vk.Q_ELLIPTIC.x
            mstore(add(_vk, 0x2a0), 0x017714509f01d1a9ee7ebaf4d50745e33a14150b4fe9850a27e44de56d88cb14) // vk.Q_ELLIPTIC.y
            mstore(add(_vk, 0x2c0), 0x2e76c4474fcb457db84fb273ccc10a4647a1a37444369f2f275bb74540f5e2d0) // vk.Q_AUX.x
            mstore(add(_vk, 0x2e0), 0x209035caddd02a78acd0ed617a85d782533bd142c6cad8e3338f3142b919c3a4) // vk.Q_AUX.y
            mstore(add(_vk, 0x300), 0x0d5dd6d56879583e7165c147ee97eaa24460c3c80221b9ab02c273acd635326f) // vk.SIGMA1.x
            mstore(add(_vk, 0x320), 0x07b4e34a62b94aa552874222bf509f978a26bf02c0b6cbe103580f1eb35507e8) // vk.SIGMA1.y
            mstore(add(_vk, 0x340), 0x04a560eac4837b91c34c0ae2943a77a6153f503568ffe7e9ead901f89f674cb4) // vk.SIGMA2.x
            mstore(add(_vk, 0x360), 0x18e097d00c2deab8a5979615e9b889636b75c4395c61cb7d2fecab73e26050d3) // vk.SIGMA2.y
            mstore(add(_vk, 0x380), 0x0a27a0eb5b2ee3ed3276e5b5ee0c0aec8f08c20181b1cf972260ebe372dfd400) // vk.SIGMA3.x
            mstore(add(_vk, 0x3a0), 0x0b0a3118785d20395210d84638f8f7a59ec04f1b1c1e78dbb49c3905b94c91f1) // vk.SIGMA3.y
            mstore(add(_vk, 0x3c0), 0x28788819fba033b8a2f7ac3b23523e7ab902f09a2b69b04c3e4b025a4a99595e) // vk.SIGMA4.x
            mstore(add(_vk, 0x3e0), 0x14c34811e5b2b107df4c56b63979fdd7dfe8f3cda6a831e8a8de1eda83cb6208) // vk.SIGMA4.y
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
            mstore(add(_vk, 0x540), 0x2871ded574d991498e6d620207625a6898764b13e734ba5d587ec0e88e3f8b4f) // vk.ID1.x
            mstore(add(_vk, 0x560), 0x1a53006c9aaee18116a38b791f4c7450c011812a6b90e4a693bfb9ec82662a83) // vk.ID1.y
            mstore(add(_vk, 0x580), 0x0a195f81b23e3a6fdde446edcbf1c632c73bc4263a791b9027ce132785e5a64d) // vk.ID2.x
            mstore(add(_vk, 0x5a0), 0x21b6fc6d7cb6b441dff3da9a787656e58da274c40202d2905c2546051fea4819) // vk.ID2.y
            mstore(add(_vk, 0x5c0), 0x074e6adf78bcfeca9a018bc971721bfe96eb235c8cb8d5cb9b9eb395190b9f44) // vk.ID3.x
            mstore(add(_vk, 0x5e0), 0x0aa93f0dee72b167251a80f76a0b06c746617372a786bb1d73d866d010f4f48c) // vk.ID3.y
            mstore(add(_vk, 0x600), 0x18004ec4a860a987edd7d25a880f642acf4ec2f9f56d16ec233a7a5f5a0b70e0) // vk.ID4.x
            mstore(add(_vk, 0x620), 0x0be5f18ef28875612cffcf09d7238d880ca67f651d8c6cc748a0e107dbd7d3d4) // vk.ID4.y
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

