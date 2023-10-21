// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./BaseUltraVerifier.sol";

contract Timeline {
    struct Post {
        bytes32[] content;
        address author;
        uint256 likes;
        uint256 commentsCount;
        bytes32 positive;
        bytes32 hash;
        bytes proof;
        bytes32[] publicInputs;
    }

    struct Comment {
        string content;
        address author;
        bool positive;
    }

    struct Profile {
        string username;
        string bio;
    }


    mapping(uint256 => Post) public posts;
    mapping(address => Profile) public profiles;
    mapping(uint256 => mapping(address => bool)) public likedBy;
    mapping(uint256 => mapping(uint256 => Comment)) public comments;

    BaseUltraVerifier public baseUltraVerifier;

    uint256 public postsCount;

    constructor(address verifier) {
        baseUltraVerifier = BaseUltraVerifier(verifier);
    }

    function createPost(bytes calldata _proof, bytes32[] calldata _publicInputs) public {
        require(baseUltraVerifier.verify(_proof, _publicInputs), "Wrong proof");
        posts[postsCount] = Post({
            content: _publicInputs[: _publicInputs.length - 2],
            author: msg.sender,
            likes: 0,
            commentsCount: 0,
            positive: _publicInputs[_publicInputs.length - 2],
            hash: _publicInputs[_publicInputs.length - 1],
            proof: _proof,
            publicInputs : _publicInputs
        });
        postsCount++;
    }

    function likePost(uint256 _postId) public {
        require(_postId < postsCount, "Invalid Post ID");
        require(!likedBy[_postId][msg.sender], "Already liked");

        posts[_postId].likes++;
        likedBy[_postId][msg.sender] = true;
    }

    function verify(uint256 _postId) public view returns (bool){
        require(_postId < postsCount, "Invalid Post ID");

        Post storage post = posts[_postId];

        return baseUltraVerifier.verify(post.proof, post.publicInputs);
    }

    function commentOnPost(uint256 _postId, string memory _content, bytes calldata _proof, bytes32[] calldata _publicInputs) public {
        require(_postId < postsCount, "Invalid Post ID");
        require(baseUltraVerifier.verify(_proof, _publicInputs), "Wrong proof");

        comments[_postId][posts[_postId].commentsCount] = Comment({
            content: _content,
            author: msg.sender,
            positive: _publicInputs[1] == bytes32("1")
        });

        posts[_postId].commentsCount++;
    }

    function setUserProfile(string memory _username, string memory _bio) public {
        profiles[msg.sender] = Profile({
            username: _username,
            bio: _bio
        });
    }

    // View methods
    function getUserProfile(address _user) public view returns (string memory, string memory) {
        Profile storage profile = profiles[_user];
        return (profile.username, profile.bio);
    }

    function getPost(uint256 _postId) public view returns (bytes32[] memory, address, uint256, uint256, bytes32) {
        require(_postId < postsCount, "Invalid Post ID");

        Post storage post = posts[_postId];

        return (
            post.content,
            post.author,
            post.likes,
            post.commentsCount,
            post.positive
        );
    }

    function getComment(uint256 _postId, uint256 _commentId) public view returns (string memory, address) {
        require(_postId < postsCount, "Invalid Post ID");
        require(_commentId < posts[_postId].commentsCount, "Invalid Comment ID");

        Comment storage comment = comments[_postId][_commentId];
        return (
            comment.content,
            comment.author
        );
    }

    function isLikedBy(uint256 _postId, address _user) public view returns (bool) {
        require(_postId < postsCount, "Invalid Post ID");

        return likedBy[_postId][_user];
    }
}
