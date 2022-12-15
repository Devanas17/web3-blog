// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Blog {
    event BlogCreation(
        uint256 id,
        address author,
        string title,
        string content,
        string image
    );
    event EditedBlog(
        uint256 id,
        address author,
        string title,
        string content,
        string image
    );

    struct BlogPost {
        uint256 postId;
        address author;
        string title;
        string content;
        string image;
    }

    mapping(uint256 => BlogPost) public blogPosts;
    uint256 public blogPostCounter;

    function createBlog(
        string memory _title,
        string memory _content,
        string memory _image
    ) public {
        blogPostCounter++;
        blogPosts[blogPostCounter] = BlogPost(
            blogPostCounter,
            msg.sender,
            _title,
            _content,
            _image
        );
        emit BlogCreation(
            blogPostCounter,
            msg.sender,
            _title,
            _content,
            _image
        );
    }

    function editBlog(
        uint256 _id,
        string memory _title,
        string memory _content,
        string memory _image
    ) public {
        require(
            blogPosts[_id].author == msg.sender,
            "Only Author can edit the blog"
        );
        blogPosts[_id].title = _title;
        blogPosts[_id].content = _content;
        blogPosts[_id].image = _image;

        emit EditedBlog(_id, msg.sender, _title, _content, _image);
    }

    function getBlogs() public view returns (BlogPost[] memory) {
        BlogPost[] memory _allPost = new BlogPost[](blogPostCounter);
        for (uint256 i = 0; i < blogPostCounter; i++) {
            BlogPost storage _blog = blogPosts[i + 1];

            _allPost[i] = _blog;
        }
        return _allPost;
    }
}
