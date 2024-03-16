//SPDX-Licence-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{
    //USER STRUCT
    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubKey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruct{
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //CHECK USER EXIST
    function checkUserExists(address pubKey) public view returns(bool){
        return bytes(userList[pubKey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name) external{
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruct(name, msg.sender));
    }

    //GET USERNAME
    function getUserName(address pubKey) external view returns(string memory){
        require(checkUserExists(pubKey) == true, "User does not exist");
        return userList[pubKey].name;
    } 

    //ADD FRIENDS
    function addFriend(address pubKey, string calldata name) external{
        require(checkUserExists(msg.sender) == true, "User does not exist");
        require(checkUserExists(pubKey) == true, "Friend does not exist");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(msg.sender != pubKey, "Cannot add yourself");
        require(checkAlreadyFriend(msg.sender, pubKey) == false, "Already friends");
        userList[msg.sender].friendList.push(friend(pubKey, name));

        _addFriend(pubKey, msg.sender, userList[msg.sender].name);
        _addFriend(msg.sender, pubKey, name);
    }

    //CHECK ALREADY FRIEND
    function checkAlreadyFriend(address pubKey1, address pubKey2) internal view returns(bool){
        if(userList[pubKey1].friendList.length > userList[pubKey2].friendList.length){
            address temp = pubKey1;
            pubKey1 = pubKey2;
            pubKey2 = temp;
        }

        for(uint256 i = 0; i<userList[pubKey1].friendList.length; i++){
            if(userList[pubKey1].friendList[i].pubKey == pubKey2){
                return true;
            }
        }
        return false;
    }

    function _addFriend(address pubKey, address friendPubKey, string memory name) internal{
        friend memory newFriend = friend (friendPubKey, name);
        userList[pubKey].friendList.push(newFriend);
    }

    //GET FRIENDS
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //Get Chat Code
    function _getChatCode(address pubKey1, address pubKey2) internal pure returns(bytes32){
        if(pubKey1 < pubKey2){
            return keccak256(abi.encodePacked(pubKey1, pubKey2));
        }
        else{
            return keccak256(abi.encodePacked(pubKey2, pubKey1));
        }
    }

    //SEND MESSAGE
    function sendMessage(address pubKey, string calldata _msg) external{
        require(checkUserExists(msg.sender) == true, "User does not exist");
        require(checkUserExists(pubKey) == true, "Friend does not exist");
        require(checkAlreadyFriend(msg.sender, pubKey));

        bytes32 chatCode = _getChatCode(msg.sender, pubKey);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //READ MESSAGE
    function readMessage(address pubKey) external view returns(message[] memory){
        require(checkUserExists(msg.sender) == true, "User does not exist");
        require(checkUserExists(pubKey) == true, "Friend does not exist");
        require(checkAlreadyFriend(msg.sender, pubKey));

        bytes32 chatCode = _getChatCode(msg.sender, pubKey);
        return allMessages[chatCode];
    }

    //GET ALL USERS
    function getAllUsersList() external view returns(AllUserStruct[] memory){
        return getAllUsers;
    }
}