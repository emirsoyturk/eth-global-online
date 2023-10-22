// Verification Key Hash: c03a816ed87d56d939b460aa62cdf5619d053fedc20aec5b1436f0dd77101509
// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec
pragma solidity >=0.8.4;

library UltraVerificationKey {
    function verificationKeyHash() internal pure returns(bytes32) {
        return 0x2230e1fd250d8557bbb56e5a3f0497bbec37dab4bcb59d00803a59835c050b47;
    }

    function loadVerificationKey(uint256 _vk, uint256 _omegaInverseLoc) internal pure {
        assembly {
            mstore(add(_vk, 0x00), 0x0000000000000000000000000000000000000000000000000000000000040000) // vk.circuit_size
            mstore(add(_vk, 0x20), 0x0000000000000000000000000000000000000000000000000000000000000022) // vk.num_inputs
            mstore(add(_vk, 0x40), 0x19ddbcaf3a8d46c15c0176fbb5b95e4dc57088ff13f4d1bd84c6bfa57dcdc0e0) // vk.work_root
            mstore(add(_vk, 0x60), 0x30644259cd94e7dd5045d7a27013b7fcd21c9e3b7fa75222e7bda49b729b0401) // vk.domain_inverse
            mstore(add(_vk, 0x80), 0x07bba6798fa2a3db181ad9970ddca06bd961871d448cbd1050e4ab2f0b8c526d) // vk.Q1.x
            mstore(add(_vk, 0xa0), 0x29b626dd0ccc24367e8d9aa47d89dcb63930a68cde116959f01a32d8cb168978) // vk.Q1.y
            mstore(add(_vk, 0xc0), 0x0008b41abbec690cb1ca702c9a1dd34059364de35c9d72cd96db235e60f7f519) // vk.Q2.x
            mstore(add(_vk, 0xe0), 0x1e8d3b363d2467af3fd9326630972e6bde0bea7c01736085d985d9d5d55caa75) // vk.Q2.y
            mstore(add(_vk, 0x100), 0x275c66d4bf3977885268497f4e921302f3962acfb2f0d40d902cdbd00a1537f8) // vk.Q3.x
            mstore(add(_vk, 0x120), 0x2ce1ea7a5f45931725433a1049970d89d76f83772b0a589bdde7ae6e38c3cd92) // vk.Q3.y
            mstore(add(_vk, 0x140), 0x14572fdc37996296e60095d8807e08bcf30c26957aa7cacfd29659647b3cadc9) // vk.Q4.x
            mstore(add(_vk, 0x160), 0x1036977ba544007d8918666ac8d6ebaab26fbea8d7c72f0a0455eb5cb7f0facb) // vk.Q4.y
            mstore(add(_vk, 0x180), 0x15874a572142c969b5db833c4c74bb0e51e411a38d8eb9fe0c07d67601dcab03) // vk.Q_M.x
            mstore(add(_vk, 0x1a0), 0x209b8462043497eee7eedd3708887474bd160c0724e448c3064a6c88834c05e0) // vk.Q_M.y
            mstore(add(_vk, 0x1c0), 0x0f2b33c2f9003bd6c777af90c18008d7900c4d8b890c3df89688219c1d018088) // vk.Q_C.x
            mstore(add(_vk, 0x1e0), 0x0c6c8dea4130343d03b04d365a11e20b4e2f12181453b4e557ae2cf86c977a06) // vk.Q_C.y
            mstore(add(_vk, 0x200), 0x08d4ae8fa35d8a100d5bcc6da8b6ba5bf43c29bc98c511ea07029918674cac3a) // vk.Q_ARITHMETIC.x
            mstore(add(_vk, 0x220), 0x244b3c832ae89fbcfd95d640368e08319e880392e86dbc83fabb7823ce8c4d6e) // vk.Q_ARITHMETIC.y
            mstore(add(_vk, 0x240), 0x2a4ccdc5140b40989a04ca85f63ebc182948bad18710dfe15737816158dfe89e) // vk.QSORT.x
            mstore(add(_vk, 0x260), 0x033017ba66dfc0e2dc31c34df88608201b18ef54e787cfc6218aaa0b14903666) // vk.QSORT.y
            mstore(add(_vk, 0x280), 0x2d5247c138f521f72a738d5497ad48d7fac4e2369d9a8e99a9b9f8070d931963) // vk.Q_ELLIPTIC.x
            mstore(add(_vk, 0x2a0), 0x055c8ea419d61ab8dcc3533ad944e83262d0648c1864002d48a5f4907aa301a4) // vk.Q_ELLIPTIC.y
            mstore(add(_vk, 0x2c0), 0x2fd4b363c9c56af9b9f000d40bb5c8d0180b069d2037dbc3f5d84574b0e180ce) // vk.Q_AUX.x
            mstore(add(_vk, 0x2e0), 0x20f57d268cb9229f6f1bd9d1428cba63712347b052fdf2c61b10339107a749f1) // vk.Q_AUX.y
            mstore(add(_vk, 0x300), 0x1842830ec45d1a16bf10c43e710513736b308ea2bddab0b95cde40c1cf979b69) // vk.SIGMA1.x
            mstore(add(_vk, 0x320), 0x26c1c66faae22f4a514340af9b6dfb7957fc77d7ddf3420e7c6c5686ff162554) // vk.SIGMA1.y
            mstore(add(_vk, 0x340), 0x0ff2f6b15f0eea09370beda34dfad641658162e7430d0ff6c5d3cad942042f60) // vk.SIGMA2.x
            mstore(add(_vk, 0x360), 0x21ba5b5b4e8c4463c1dc334e7c6226f847626051ef2b08ae4f4bca276b147ec2) // vk.SIGMA2.y
            mstore(add(_vk, 0x380), 0x1e68746c0ae943ea731ae36923074f052d69f0376d8919c3338604410536d17d) // vk.SIGMA3.x
            mstore(add(_vk, 0x3a0), 0x1244b40a98ace9d3bbdde6a19cd94a8ea5715809957eae699fdd9d7398b72f62) // vk.SIGMA3.y
            mstore(add(_vk, 0x3c0), 0x1581713d0226947c1c6fc49920d0e93db7ff2ded07188066bd71f3ba0a04d24a) // vk.SIGMA4.x
            mstore(add(_vk, 0x3e0), 0x1475f09b8f50f7d9f016db202fc3c7d7b1c5534838106b98105ea918a4f6c3df) // vk.SIGMA4.y
            mstore(add(_vk, 0x400), 0x192711fca2f5b36970aae483f46068b91f52060c02f8325294db54bb0a11933e) // vk.TABLE1.x
            mstore(add(_vk, 0x420), 0x1bff24689c6227448a09dbed17ef39405aa88aedd9f9384dfe3f3d0a0480cbac) // vk.TABLE1.y
            mstore(add(_vk, 0x440), 0x194b5ba84c106e0146f0952b5454de8274ff80a9f83cf14c4f6f0742eeb19864) // vk.TABLE2.x
            mstore(add(_vk, 0x460), 0x1ec2dc36740cd8f027ac2c850a042d4482e3b79c8105eef51df522056ae7605a) // vk.TABLE2.y
            mstore(add(_vk, 0x480), 0x2263709bd57b4b6419d0e9ddb56ac9c9419a18e11184552647e1788e62f3daf3) // vk.TABLE3.x
            mstore(add(_vk, 0x4a0), 0x28473c39c8ad63fc67af038fa2594679efec0bf7da69050d9ddee43a5837f731) // vk.TABLE3.y
            mstore(add(_vk, 0x4c0), 0x0c55dfdec4ea5722f75304d9d07d41349451120f02efda3f0355fc1c953256c6) // vk.TABLE4.x
            mstore(add(_vk, 0x4e0), 0x2018b108aefa236db9e8d68ca15fd206e209683379f8cb36fe3a8a7d0456bf08) // vk.TABLE4.y
            mstore(add(_vk, 0x500), 0x044840c394aea0c66af2b47aacc5c67b7f95b1b817e8215ff706e6adf02370fd) // vk.TABLE_TYPE.x
            mstore(add(_vk, 0x520), 0x1b231e208d637332ff2182fe11f11404be27e4c2486620025dbaefe957144cbe) // vk.TABLE_TYPE.y
            mstore(add(_vk, 0x540), 0x2a4409a07015e66d9fabce5d738ba6557a387ac7343550c89b0b9431879a651f) // vk.ID1.x
            mstore(add(_vk, 0x560), 0x22051021d4f23fba251816b170faee21441bdb98e94dbbde1b98799a38cecb18) // vk.ID1.y
            mstore(add(_vk, 0x580), 0x2664ae6b521b288ca6ffa723978728cdad483a9edce6421deb1f59feb6c0a13c) // vk.ID2.x
            mstore(add(_vk, 0x5a0), 0x2905525a14584ee2a341b689326bf47f21ea3e1fa7adf518cc7665da07e95c01) // vk.ID2.y
            mstore(add(_vk, 0x5c0), 0x1897d4f41905e71e6d6eb567f69a5c3ae4dbfe9034a3cc79ed0901dfbb95d14c) // vk.ID3.x
            mstore(add(_vk, 0x5e0), 0x2f07c71b4b43d2c683d290c4d50eb86815895848e348af03525631f0eededffc) // vk.ID3.y
            mstore(add(_vk, 0x600), 0x19162c9163edd09a36d230840fc653b9041eaff39b115f28aadc7038eeafc916) // vk.ID4.x
            mstore(add(_vk, 0x620), 0x0b7f5be315d6013dac2d853f2a7d34a56c07d12d3240fb3e1a5392beb843b714) // vk.ID4.y
            mstore(add(_vk, 0x640), 0x00) // vk.contains_recursive_proof
            mstore(add(_vk, 0x660), 0) // vk.recursive_proof_public_input_indices
            mstore(add(_vk, 0x680), 0x260e01b251f6f1c7e7ff4e580791dee8ea51d87a358e038b4efe30fac09383c1) // vk.g2_x.X.c1
            mstore(add(_vk, 0x6a0), 0x0118c4d5b837bcc2bc89b5b398b5974e9f5944073b32078b7e231fec938883b0) // vk.g2_x.X.c0
            mstore(add(_vk, 0x6c0), 0x04fc6369f7110fe3d25156c1bb9a72859cf2a04641f99ba4ee413c80da6a5fe4) // vk.g2_x.Y.c1
            mstore(add(_vk, 0x6e0), 0x22febda3c0c0632a56475b4214e5615e11e6dd3f96e6cea2854a87d4dacc5e55) // vk.g2_x.Y.c0
            mstore(_omegaInverseLoc, 0x036853f083780e87f8d7c71d111119c57dbe118c22d5ad707a82317466c5174c) // vk.work_root_inverse
        }
    }
}